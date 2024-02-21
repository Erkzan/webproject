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
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow cookies and other credentials to be sent
    next();
  });

app.use("/posts", postRouter);
app.use("/profile", profileRouter);
