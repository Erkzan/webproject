import express from "express";
import { commentModel } from "../../db/comment.db";
import { postModel } from "../../db/posts.db";
import { profileModel } from "../../db/users.db";
import { checkLogin } from "../service/middleware";
import { PostService } from "../service/post";
import { ObjectId } from "mongodb";

const postService = new PostService();

export const postRouter = express.Router();

postRouter.post("/addPost", checkLogin, async (req, res) => {
  console.log(req.body);
  let data = await profileModel.findOne({
    username: req.body.username,
  });

  //uppdatera comment på profil

  if (data) {
    await postModel.create({
      message: req.body.message,
      author: data.username,
      authorId: data._id,
      likes: 0,
      dislikes: 0,
      isComment: false,
      shares: 0,
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

postRouter.post("/getComments", async (req, res) => {
  let data = await commentModel.find({
    commentUnder: req.body.commentUnder,
  });

  res.send(data);
});

postRouter.post("/addLike", checkLogin, async (req, res) => {
  try {
    let myProfile = await profileModel.findOne({
      username: req.cookies.token.username,
    });

    await postService.like(req.body.id, myProfile?._id);

  } catch (e) {
    res.send(e);
  }
});

postRouter.post("/addDislike", checkLogin, async (req, res) => {
  try {
    let data = await postModel.findById(req.body.id);
    let myProfile = await profileModel.findOne({
      username: req.cookies.token.username,
    });

    data.dislikes.push(myProfile._id);

    await postModel.findByIdAndUpdate(req.body.id, {
      dislikes: data.dislikes,
    });
  } catch (e) {
    res.send(e);
  }
});

export default postRouter;
