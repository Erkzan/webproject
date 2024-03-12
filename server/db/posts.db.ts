import {Schema, Model} from "mongoose";

import { Post } from "../src/model/post.interface";

import { conn } from "./conn";
import { ObjectId } from "mongodb";


const postSchema : Schema = new Schema({
    message : {type : String, required: true},
    image : {type : String, required: false},
    author : {type : String, required: true},
    authorId : {type : ObjectId, required: true},
    likes : [{type : ObjectId, unique: true, default: []}],
    dislikes : [{type : ObjectId, unique: true, default: []}],
    commentUnder : {type : ObjectId, required: false},
    shares : [{type : ObjectId, unique: true, default: []}],
    timestamp : {type : Date, required: true}
});

postSchema.index({ likes: 1 }, { unique: true });
postSchema.index({ dislikes: 1 }, { unique: true });
postSchema.index({ shares: 1 }, { unique: true });


export const postModel = conn.model<Post>("posts", postSchema);