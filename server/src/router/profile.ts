import express, { Request, Response } from "express";
import { ProfileService } from "../service/profile";
import { Profile } from "../model/profile.interface";
import path from "path";
import { userpassModel } from "../../db/userpass.db";
import jwt from "jsonwebtoken";


export const profileRouter = express.Router();


const publicPath = path.resolve(__dirname, '../../../client/public');
const dbPath = path.resolve(__dirname,'../../DB/users.json');

profileRouter.use(express.static(publicPath));


profileRouter.get("/login", (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});


profileRouter.post("/login", async(req, res) => {

    let foundUser = await userpassModel.findOne({
        username:req.body.username, 
        password:req.body.password
    });
    

    if (foundUser) {
    
        const token = jwt.sign({ username: foundUser.username }, "bögbögbögbögbögbögbög", { expiresIn: '1h' });

        res.cookie("token", token, {httpOnly:true, maxAge:600*1000, sameSite:"lax"});
        res.redirect("/profile");
        
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});


profileRouter.get("/register", (req, res) => {
    res.sendFile(path.join(publicPath, 'register.html'));
});


profileRouter.post("/register", async(req, res) => {
    
    let existingUser = await userpassModel.findOne({
        username: req.body.username
    });
    
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }

    await userpassModel.create({
        username:req.body.username, 
        password:req.body.password
    });


    const token = jwt.sign({ username: req.body.username }, "bögbögbögbögbögbögbög", { expiresIn: '1h' });

    res.cookie("token", token, {httpOnly:true, maxAge:600*1000, sameSite:"lax"});
    res.redirect("/profile");
});


export default profileRouter;

