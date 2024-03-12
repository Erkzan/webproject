import { ObjectId } from "mongodb";

export interface Post{
    id :  String;
    message : String;
    image? : String; // Temporary
    author : String;
    authorId : String;
    likes : Array<ObjectId>;
    dislikes : Array<ObjectId>;
    commentUnder? : ObjectId;
    shares : Array<ObjectId>;
    timestamp : Date;
} 