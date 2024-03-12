import { ObjectId } from "mongodb";
import { Post } from "../model/post.interface";
import { postModel } from "../../db/posts.db";

export class PostService {
    private posts : Post[] = [];

    async getPosts() : Promise<Post[]> {
        //return this.posts;

        return await postModel.find();
    } 

    async addPost(newPost: Post) : Promise<ObjectId> {
        //this.posts.push(newPost);

        const createdPost = await postModel.create(newPost);
        return createdPost._id;
    }

    async getPostsByAuthorId(authorId: ObjectId) : Promise<Post[]> {
        //return this.posts.filter(post => post.authorId === authorId);
        
        return await postModel.find({authorId: authorId});
    }

    async getPostById(postId: ObjectId) : Promise<Post | null> {
        //return this.posts.find(post => post._id === postId);
        
        return await postModel.findById(postId);
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
        try {
            await this.removeDislike(postId, myId);
            await this.addLike(postId, myId);
        } catch (error) {
            return false;
        }
        return true;
    }

    async dislike(postId: ObjectId, myId: ObjectId){
        try {
            await this.removeLike(postId, myId);
            await this.addDislike(postId, myId);
        } catch (error) {
            return false;
        }
        return true;
    }
    
}

