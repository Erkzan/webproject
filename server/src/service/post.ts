import { Post } from "../model/post.interface";

export class PostService {
    private posts : Post[] = [];

    async getPosts() : Promise<Post[]> {
        return this.posts;
    } 

    addPost(newPost: Post) : void {
        this.posts.push(newPost);
    }
    
    
}

