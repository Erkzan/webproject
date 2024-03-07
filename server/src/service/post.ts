import { ObjectId } from "mongodb";
import { Post } from "../model/post.interface";
import { postModel } from "../../db/posts.db";

export class PostService {
    private posts : Post[] = [];

    async getPosts() : Promise<Post[]> {
        return this.posts;
    } 

    addPost(newPost: Post) : void {
        this.posts.push(newPost);
    }

    async addLike(postId: ObjectId, myId: ObjectId){
        try {
            let data = await postModel.findById(postId);
            data?.likes.push(myId);
            await postModel.findByIdAndUpdate(postId, {likes: data?.likes});
            return true;

        } catch (error) {
            return false;
        }
    }

    async removeLike(postId: ObjectId, myId: ObjectId){
        try {
            let data = await postModel.findById(postId);
            const startIndex = data?.likes.indexOf(myId);

            if (startIndex !== -1) {
                data?.likes.splice(startIndex, 1);
            }
            await postModel.findByIdAndUpdate(postId, {likes: data?.likes});
            return true;
            
        } catch (error) {
            return false;
        }
    }
    
    
    async addDislike(postId: ObjectId, myId: ObjectId){
        try {
            let data = await postModel.findById(postId);
            data?.dislikes.push(myId);
            await postModel.findByIdAndUpdate(postId, {dislikes: data?.dislikes});
            return true;

        } catch (error) {
            return false;
        }
    }

    async removeDislike(postId: ObjectId, myId: ObjectId){
        try {
            let data = await postModel.findById(postId);
            const startIndex = data?.dislikes.indexOf(myId);

            if (startIndex !== -1) {
                data?.dislikes.splice(startIndex, 1);
            }
            await postModel.findByIdAndUpdate(postId, {dislikes: data?.dislikes});
            return true;
            
        } catch (error) {
            return false;
        }
    }

    async like(postId: ObjectId, myId: ObjectId){
        await this.removeDislike(postId, myId);
        await this.addLike(postId, myId);
    }

    async dislike(postId: ObjectId, myId: ObjectId){
        await this.removeLike(postId, myId);
        await this.addDislike(postId, myId);
    }
    
}

