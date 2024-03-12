import { Schema } from "mongoose";
import { Post } from "../src/model/post.interface";
import { conn } from "./conn";
import { ObjectId } from "mongodb";

const postSchema = new Schema({
    message: { type: String, required: true },
    image: { type: String, required: false },
    author: { type: String, required: true },
    authorId: { type: ObjectId, required: true },
    likes: [{ type: ObjectId, default: [] }], 
    dislikes: [{ type: ObjectId, default: [] }], 
    commentUnder: { type: ObjectId, required: false },
    shares: [{ type: ObjectId, default: [] }], 
    timestamp: { type: Date, required: true }
});

export const postModel = conn.model<Post>("posts", postSchema);