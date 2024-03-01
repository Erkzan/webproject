import { ObjectId } from "mongodb";

export interface Post{
    id :  String;
    message : String;
    image : String; // Temporary
    author : String;
    authorId : String;
    likes : number;
    dislikes : number;
    commentUnder : ObjectId;
    shares : number;
} 