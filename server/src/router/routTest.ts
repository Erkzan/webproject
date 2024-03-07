import express from "express";
import { testModel } from "../../db/test.dv";


export const testRouter = express.Router();

testRouter.get("/", async(req, res) => {
    let data = await testModel.find({});

    res.send(data);
});

testRouter.post("/add", async(req, res) => {
    await testModel.create({
        testString: req.body.data
    });

    res.send(true);
});


export default testRouter;
