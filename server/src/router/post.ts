import express from "express";
import { PostService } from "../service/post";
import { profileModel } from "../../db/users.db";
import { postModel } from "../../db/posts.db";
import { commentModel } from "../../db/comment.db";

const postService = new PostService();

export const postRouter = express.Router();

postRouter.post("/addPost", async (req, res) => {
  let data = await profileModel.findOne({
    username: req.body.username,
  });

  //uppdatera comment på profil

  if (data) {
    await postModel.create({
      message: req.body.message,
      author: data.name,
      authorId: data._id,
      likes: 0,
      dislikes: 0,
      isComment: false,
      shares: 0,
    });
  
    res.send("Postat");
  }
  else {
    res.send("fel");
  }
});

postRouter.post("/addComment", async(req, res) => {
  let data = await commentModel.find({
    commentUnder: req.body.commentUnder
  });


  res.send(data);
});

postRouter.post("/getAll", async (req, res) => {
  let data = await postModel.find({});


  res.send(data);
});

postRouter.post("/getComments", async (req, res) => {
  let data = await commentModel.find({
    commentUnder: req.body.commentUnder
  });

  res.send(data);
});

export default postRouter;
