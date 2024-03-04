export interface Post{
    id :  String;
    message : String;
    image : String; // Temporary
    author : String;
    authorId : String;
    likes : number;
    dislikes : number;
    comments : String[];
    isComment : boolean;
    shares : number;
} 