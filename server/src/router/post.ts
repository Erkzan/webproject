import express from "express";
import { PostService } from "../service/post";

const postService = new PostService();

export const postRouter = express.Router();

postRouter.post("/addPost", async (req, res) => {
  let data = await profileModel.findOne({
    username: req.body.username,
  });

  await postModel.create({
    message: req.body.message,
    author: data.name,
    authorId: data._id,
    likes: 0,
    dislikes: 0,
    comments: [],
    isComment: false,
    shares: 0,
  });

  res.send("Postat");
});

postRouter.get("/getAll", async (req, res) => {
  res.send(await postService.getPosts());
});

export default postRouter;
