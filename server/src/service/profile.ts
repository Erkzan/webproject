import { Profile } from "../model/profile.interface";
import path from "path";
import jwt from "jsonwebtoken";


const publicPath = path.resolve(__dirname, '../../../client/public');
const dbPath = path.resolve(__dirname,'../../DB/users.json');

interface User {
    username: string;
    password: string;
}

export class ProfileService {
   



}


