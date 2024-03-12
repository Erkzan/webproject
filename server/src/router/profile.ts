import express from "express";
import jwt from "jsonwebtoken";
import { userpassModel } from "../../db/userpass.db";
import { profileModel } from "../../db/users.db";
import { checkLogin } from "../service/middleware";

export const profileRouter = express.Router();

profileRouter.post("/login", async (req, res) => {
  let foundUser = await userpassModel.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (foundUser) {
    const token = jwt.sign(
      { username: foundUser.username },
      "hemlighemlighemlighemlig",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 600 * 1000,
      sameSite: "none",
      secure: true,
      //domain: ".localhost:8080"
    });

    res.send("hejsan");
  } else {
    console.log("401");
    res.status(401).json({ message: "Invalid credentials" });
  }
});

profileRouter.post("/register", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.send("Failed register");
  } else {
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
      "hemlighemlighemlighemlig",
      { expiresIn: "1h" }
    );

    //set profile
    await profileModel.create({
      username: req.body.username,
      name: req.body.displayName,
      email: req.body.email,
      bio: "",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 600 * 1000,
      sameSite: "none",
      secure: true,
      //domain: ".localhost:8080"
    });

    res.send("hejsan");
  }
});

profileRouter.post("/getProfile", async (req, res) => {
  let profile = await profileModel.findOne({
    username: req.body.username,
  });

  if (profile) {
    res.send({ profile });
  } else {
    res.sendStatus(404);
  }
});

profileRouter.post("/changeProfilePic", checkLogin, async (req, res) => {

  let token = req.cookies.token;
  token = jwt.verify(token, "hemlighemlighemlighemlig");

  try {
    let myProfile = await profileModel.findOne({
      username: token.username,
    });

    profileModel.findByIdAndUpdate(myProfile?._id, {$set: {profilePicture: req.body.color}});
  
    res.send("ok");
  }
  catch (e){
    res.send("error");
  }
});

profileRouter.post("/checkLogin", async (req, res) => {
  try {
    let token = req.cookies.token;
    token = jwt.verify(token, "hemlighemlighemlighemlig");
    res.send(token.username);
  } catch (error) {
    res.send(null);
  }
});

profileRouter.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
  } catch {}
  res.send("error");
});

profileRouter.post("/getNameById", async (req, res) => {
  let profile = await profileModel.findById(req.body.id);
  if (profile) {
    res.send({ name: profile.name });
  } else {
    res.sendStatus(404);
  }
});

profileRouter.post("/getPicById", async (req, res) => {
  let color = await profileModel.findById(req.body.id);
  if (color) {
    res.send({ name: color.profilePicture });
  } else {
    res.sendStatus(404);
  }
});

profileRouter.post("/getSearchedProfiles", async (req, res) => {
  let data = await profileModel.find({});

  let newData = [];

  data.forEach((current) => {
    if (
      current.name.includes(req.body.search) ||
      current.username.includes(req.body.search)
    ) {
      newData.push(current);
    }
  });

  res.send(newData);
});

profileRouter.post("/getAll", async (req, res) => {
  let data = await profileModel.find({});

  try {
    let myProfile = await profileModel.findOne({
      username: req.cookies.token.username,
    });

    const startIndex = data?.indexOf(myProfile);

    if (startIndex !== -1) {
      data?.splice(startIndex, 1);
    }
  } catch (error) {}
  res.send(data);
});

export default profileRouter;
