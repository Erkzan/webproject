import { ObjectId } from "mongodb";

export interface Post{
    id :  String;
    message : String;
    image? : String; // Temporary
    author : String;
    authorId : String;
    likes : ObjectId[];
    dislikes : ObjectId[];
    commentUnder? : ObjectId;
    shares : ObjectId[];
    timestamp : Date;
} 