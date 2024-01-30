import express from "express";
import cookieParser from "cookie-parser";
import { postRouter } from "./router/post";
import path from "path";
import { mainRouter } from "./router/main";
// import {  } from "./router/...";

export const app = express();
require("dotenv").config();

export const publicPath = path.resolve(__dirname, '../../client/public');


app.use(express.json());
app.use(express.static(publicPath));
app.use(cookieParser());


app.use("/", mainRouter);
app.use("/posts", postRouter);