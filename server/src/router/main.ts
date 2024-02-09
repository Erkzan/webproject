import express, { Request, Response } from "express";
import { PostService } from "../service/post";
import { Post } from "../model/post.interface";
import path from "path";
import { publicPath } from "../start";

export const mainRouter = express.Router();



mainRouter.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

mainRouter.get("/friends", (req, res) => {
    res.sendFile(path.join(publicPath, 'friends.html'));
});

mainRouter.get("/profile", (req, res) => {
    res.sendFile(path.join(publicPath, 'profile.html'));
});

mainRouter.get("/search", (req, res) => {
    res.sendFile(path.join(publicPath, 'search.html'));
});

mainRouter.get("/login", (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});


