import express from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { userpassModel } from "../../db/userpass.db";
import { profileModel } from "../../db/users.db";

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

    console.log("grr efter");

    res.send("hejsan");
  } else {
    console.log("401");
    res.status(401).json({ message: "Invalid credentials" });
  }
});

profileRouter.post("/register", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    console.log(req.body.username);
    console.log(req.body.password);
    res.send("Failed register");
  } else {
    console.log(req.body);

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
      sameSite: "none",
      secure: true,
      //domain: ".localhost:8080"
    });

    //set profile
    await profileModel.create({
      username: req.body.username,
      name: req.body.displayName,
      email: req.body.email,
      posts: [],
      friends: [],
      bio: "",
    });

    res.send("hejsan");
  }
});

profileRouter.post("/getProfile", async (req, res) => {
  let profile = await profileModel.findOne({
    username: req.body.username,
  });

  console.log("prfile: " + profile);

  if (profile) {
    res.send({ profile });
  } else {
    res.sendStatus(404);
  }
});

profileRouter.post("/changeProfile", async (req, res) => {
  res.send("JE");
});

profileRouter.post("/checkLogin", async (req, res) => {
  
});

export default profileRouter;
