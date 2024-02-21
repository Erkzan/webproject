import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { postRouter } from "./router/post";
import { profileRouter } from "./router/profile";

// import {  } from "./router/...";

export const app = express();
require("dotenv").config();


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());
app.use(cors());

app.use("/posts", postRouter);
app.use("/profile", profileRouter);
