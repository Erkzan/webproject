import express from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { userpassModel } from "../../db/userpass.db";

export const profileRouter = express.Router();

const dbPath = path.resolve(__dirname, "../../DB/users.json");

profileRouter.post("/login", async (req, res) => {
  console.log("loggar in");
  let foundUser = await userpassModel.findOne({
    username: req.body.username,
    password: req.body.password,
  });


  if (foundUser) {
    const token = jwt.sign(
      { username: foundUser.username },
      "bögbögbögbögbögbögbög",
      { expiresIn: "1h" }
    );

    console.log("grr före");

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 600 * 1000,
      sameSite: "none",
      secure: true,
      //domain: ".localhost:8080"
    });

    console.log("grr efter")

    res.send("hejsan");
    
  } else {
    console.log("401")
    res.status(401).json({ message: "Invalid credentials" });
  }
});

profileRouter.post("/register", async (req, res) => {
  let existingUser = await userpassModel.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  await userpassModel.create({
    username: req.body.username,
    password: req.body.password,
  });

  const token = jwt.sign(
    { username: req.body.username },
    "bögbögbögbögbögbögbög",
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 600 * 1000,
    sameSite: "lax",
  });
  res.redirect("/profile");
});

export default profileRouter;
