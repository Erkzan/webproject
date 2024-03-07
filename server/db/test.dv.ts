
import {Schema, Model} from "mongoose";

import { TestData } from "../src/model/test.interface";

import { conn } from "./conn";


const testSchema : Schema = new Schema({
    testString : {type : String, required: true}
});


export const testModel = conn.model<TestData>("test", testSchema);