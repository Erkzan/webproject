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
            await postModel.findByIdAndUpdate(postId, {$addToSet: {likes: myId}}, {new: true, runValidators: true});
        } catch (error) {
            return false;
        }
    }

    async removeLike(postId: ObjectId, myId: ObjectId){
        try {
            await postModel.findByIdAndUpdate(postId, {$pull: {likes: myId}}, {new: true, runValidators: true});
            return true;
            
        } catch (error) {
            return false;
        }
    }
    
    
    async addDislike(postId: ObjectId, myId: ObjectId){
        try {
            await postModel.findByIdAndUpdate(postId, {$addToSet: {dislikes: myId}}, {new: true, runValidators: true});
            return true;

        } catch (error) {
            return false;
        }
    }

    async removeDislike(postId: ObjectId, myId: ObjectId){
        try {
            await postModel.findByIdAndUpdate(postId, {$pull: {dislikes: myId}}, {new: true, runValidators: true});
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

    async getLikes(postId: ObjectId): Promise<number>{
        try {
            let post = await this.getPostById(postId);
            if (post?.likes === undefined || post?.likes.length !> 0){
                return 0;
            } else {
                return post?.likes.length;
            }
        } catch (error){
            console.log("Error fetching number of likes: " + error);
            return 0;
        }
    }

    async getDislikes(postId: ObjectId): Promise<number>{
        try {
            let post = await this.getPostById(postId);
            if (post?.dislikes === undefined || post?.dislikes.length !> 0) {
                return 0;
            } else {
                return post?.dislikes.length;
            }
        } catch (error){
            console.log("Error fetching number of dislikes: " + error);
            return 0;
        }
    }

    async getShares(postId: ObjectId): Promise<number>{
        try {
            let post = await this.getPostById(postId);
            if (post?.shares === undefined ||post?.shares.length !> 0) {
                return 0;
            } else {
                return post?.shares.length;
            }
        } catch (error){
            console.log("Error fetching number of shares" + error);
            return 0;
        }
    }
    
    async addShare(postId: ObjectId, myId: ObjectId){
        try {
            await postModel.findByIdAndUpdate(postId, {$addToSet: {shares: myId}}, {new: true, runValidators: true});
            return true;

        } catch (error) {
            return false;
        }
    }
}
