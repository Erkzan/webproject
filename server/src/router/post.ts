import express, { Request, Response } from "express";
import { PostService } from "../service/post";
import { Post } from "../model/post.interface";
import path from "path";

const postService = new PostService();

export const postRouter = express.Router();

/*
postRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Post> | String>
) => {
    try {
        const tasks = await postService.getPosts();
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
*/


const publicPath = path.resolve(__dirname, '../../../client/public');

postRouter.use(express.static(publicPath));


postRouter.get("/all", (req, res) => {
    res.send(postService.getPosts());
});

postRouter.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

