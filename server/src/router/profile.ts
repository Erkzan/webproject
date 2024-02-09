import express, { Request, Response } from "express";
import { ProfileService } from "../service/profile";
import { Profile } from "../model/profile.interface";
import path from "path";
import jwt from "jsonwebtoken";



export const profileRouter = express.Router();


const publicPath = path.resolve(__dirname, '../../../client/public');

profileRouter.use(express.static(publicPath));


profileRouter.get("/login", (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});

interface User {
    username: string;
    password: string;
}

profileRouter.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const fs = require('fs');
    const users: User[] = JSON.parse(fs.readFileSync('../../DB/users.json'));

    let foundUser = users.find((user: { username: string; password: string; }) => {
        return user.username === username && user.password === password;
    });

    if (foundUser) {
    
        const token = jwt.sign({ username: foundUser.username }, "bögbögbögbögbögbögbög", { expiresIn: '1h' });

        res.status(200).json({ token: token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

profileRouter.post("/reg", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const fs = require('fs');
    let users: User[] = JSON.parse(fs.readFileSync('../../../server/DB/users.json'));

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }

    users.push({ username: username, password: password });

    fs.writeFileSync('../../server/DB/users.json', JSON.stringify(users));

    res.status(201).json({ message: "User registered successfully" });
});


export default profileRouter;

