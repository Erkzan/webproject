import {Schema, Model} from "mongoose";

import { Post } from "../src/model/post.interface";

import { conn } from "./conn";
import { ObjectId } from "mongodb";


const postSchema : Schema = new Schema({
    message : {type : String, required: true},
    image : {type : String, required: false},
    author : {type : String, required: true},
    authorId : {type : ObjectId, required: true},
    likes : {type : Number, required: true},
    dislikes : {type : Number, required: true},
    comments : {type : Array, required: true},
    isComment : {type : Boolean, required: true},
    shares : {type : Number, required: true}
});




export const postModel = conn.model<Post>("posts", postSchema);