import express from "express";
import { commentModel } from "../../db/comment.db";
import { postModel } from "../../db/posts.db";
import { profileModel } from "../../db/users.db";
import { checkLogin } from "../service/middleware";
import { PostService } from "../service/post";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const postService = new PostService();

export const postRouter = express.Router();

postRouter.post("/addPost", checkLogin, async (req, res) => {

  let data = await profileModel.findOne({
    username: req.body.username,
  });

  if (data) {
    let newPost = await postModel.create({
      message: req.body.message,
      author: data.username,
      authorId: data._id,
      isComment: false,
      timestamp: Date.now(),
    });

    data.posts.push(newPost._id);

    await profileModel.findByIdAndUpdate(data._id, {
      posts: data.posts,
    });
    
    res.send("Postat");
  } else {
    res.send("fel");
  }
});

postRouter.post("/addComment", checkLogin, async (req, res) => {
  let data = await commentModel.find({
    commentUnder: req.body.commentUnder,
  });

  res.send(data);
});

postRouter.post("/getAll", async (req, res) => {
  let data = await postModel.find({});

  res.send(data);
});

postRouter.post("/getPostById", async (req, res) => {
  let data = await postService.getPostById(req.body.id);
  res.send(data);
});

postRouter.post("/getComments", async (req, res) => {
  let data = await commentModel.find({
    commentUnder: req.body.commentUnder,
  });

  res.send(data);
});

postRouter.post("/addLike", checkLogin, async (req, res) => {
  let token = req.cookies.token;
  token = jwt.verify(token, "hemlighemlighemlighemlig");

  try {
    let myProfile = await profileModel.findOne({
      username: token.username,
    });

    await postService.like(req.body.id, myProfile?._id);

    res.send("ok");
  } catch (e) {
    res.send(e);
  }
});

postRouter.post("/addDislike", checkLogin, async (req, res) => {

  let token = req.cookies.token;
  token = jwt.verify(token, "hemlighemlighemlighemlig");

  try {
    let myProfile = await profileModel.findOne({
      username: token.username,
    });

    await postService.dislike(req.body.id, myProfile?._id);

    res.send("ok");
  } catch (e) {
    res.send(e);
  }
});

postRouter.post("/getPostStats", async (req, res) => {
  const likes = await postService.getLikes(req.body.id);
  const dislikes = await postService.getDislikes(req.body.id);
  const shares = await postService.getShares(req.body.id);

  res.send({
    likes: likes, 
    dislikes: dislikes,
    shares: shares
  });
});

postRouter.post("/share", checkLogin, async (req, res) => {
  let token = req.cookies.token;
  token = jwt.verify(token, "hemlighemlighemlighemlig");

  try {
    let myProfile = await profileModel.findOne({
      username: token.username,
    });

    await postService.addShare(req.body.id, myProfile?._id);
    await profileModel.findByIdAndUpdate(myProfile?._id, {$push: {shares: req.body.postId}});
  
    res.send("ok");
  }
  catch (e){
    res.send("error");
  }
});

export default postRouter;
