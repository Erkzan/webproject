
import { Schema } from "mongoose";
import { UserPass } from "../src/model/userpass";
import { conn } from "./conn";

const userpassSchema : Schema = new Schema({
    username : {type : String, required: true, unique: true},
    password : {type : String, required: true}
});

export const userpassModel = conn.model<UserPass>("users", userpassSchema);