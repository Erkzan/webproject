import express from "express";
import jwt from "jsonwebtoken";


export function checkLogin(req: { cookies: { token: any; }; }, res: { send: (arg0: string) => void; }, next: () => void)
{
    try 
    {
        let token = req.cookies.token;
        token = jwt.verify(token, "hemlighemlighemlighemlig");
        next();
    }
    catch (error) 
    {
        //res.send(error.message);
        res.send("loginError");
    }
}

