import { Schema } from "mongoose";
import { Profile } from "../src/model/profile.interface";
import { conn } from "./conn";

const profileSchema : Schema = new Schema({
    username : {type : String, required: true},
    name : {type : String, required: true},
    email : {type : String, required: true},
    bio : {type : String, required: false},
    posts : {type : Array, default: []},
    shares : {type : Array, default: []},
    profilePicture : {type : String, default: "#FFFFFF"}
});

export const profileModel = conn.model<Profile>("profile", profileSchema);