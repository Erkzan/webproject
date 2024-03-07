import { ObjectId } from "mongodb";

export interface Post{
    id :  String;
    message : String;
    image : String; // Temporary
    author : String;
    authorId : String;
    likes : Array;
    dislikes : Array;
    commentUnder : ObjectId;
    shares : Array;
} 