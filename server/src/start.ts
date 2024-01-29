import express from "express";
import cookieParser from "cookie-parser";
// import {  } from "./router/...";

export const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

//app.use("/...", "routers");