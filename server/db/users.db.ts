import {Schema, Model} from "mongoose";

import { Profile } from "../src/model/profile.interface";

import { conn } from "./conn";
import { ObjectId } from "mongodb";


const profileSchema : Schema = new Schema({
    username : {type : String, required: true},
    name : {type : String, required: true},
    email : {type : String, required: true},
    bio : {type : ObjectId, required: false},
    posts : {type : Array, required: true},
    friends : {type : Array, required: true},
    profilePicture : {type : String, required: false}
});





export const profileModel = conn.model<Profile>("profile", profileSchema);