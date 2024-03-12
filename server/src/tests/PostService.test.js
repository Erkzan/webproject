const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
import { describe } from 'node:test';
import { PostService } from '../service/post';
import { postModel } from '../../db/posts.db';

let mongoServer;
let postService;
const myId = new mongoose.Types.ObjectId();
const postData = {
  message: "Test Message",
  author: "Test Author",
  authorId: new mongoose.Types.ObjectId(), 
  likes: [],
  dislikes: [],
  shares: [],
  timestamp: Date.now(),
};

// Connect to the in-memory database
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  postService = new PostService();
});

// Clear the database and close the connection
afterAll(async () => {
  await postModel.deleteMany({authorId: postData.authorId});
  await mongoose.disconnect();
  await mongoServer.stop();
}); 

describe('Database Connection Test', () => {
  // Connect to the in-memory database
  it('should establish a MongoDB connection', async () => {
    const connectionState = mongoose.connection.readyState;
    expect(connectionState).toBe(1); // 1 for connected
  });
});

describe('Post Creation and Retrieval', () => {
  let postDataId;

  // Add the post to the database
  it('should create a new post and post it', async () => {
    try {
      let result = await postService.addPost(postData);
      postDataId = result._id;
      expect(result).not.toBeNull();
    } catch (error) {
      console.log("Error adding post: " + error);
      expect(error).toBeNull();
    }
  });

  // Retrieve the post from the database
  it('should retrieve the post', async () => {
    let retrievedPost;
    try {
      retrievedPost = await postService.getPostById(postDataId);
    } catch (error) {
      console.log("Error retrieving post: " + error);
      expect(error).toBeNull();
    }

    // Check that the retrieved post matches the original post except timestamp
    expect(retrievedPost).not.toBeNull();
    expect(retrievedPost.message).toEqual(postData.message);
    expect(retrievedPost.author).toEqual(postData.author);
    expect(retrievedPost.authorId).toEqual(postData.authorId);
    expect(retrievedPost.likes).toEqual(postData.likes);
    expect(retrievedPost.dislikes).toEqual(postData.dislikes);
    expect(retrievedPost.shares).toEqual(postData.shares);
  });
});

describe('Post Liking and Disliking', () => {
  let postDataId;

  // Create a new post to like and dislike
  beforeAll(async () => {
    try {
      let result = await postService.addPost(postData);
      postDataId = result._id;
    } catch (error) {
      console.log("Error adding post: " + error);
      expect(error).toBeNull();
    }
  });

  // Like the post
  it('should like the post', async () => {
    try {
      let result = await postService.like(postDataId, myId);
      expect(result).toBe(true);
    } catch (error) {
      console.log("Error liking post: " + error);
      expect(error).toBeNull();
    }

    // Check that the post has been liked
    let retrievedPost;
    try {
      retrievedPost = await postService.getPostById(postDataId);
    } catch (error) {
      console.log("Error retrieving post: " + error);
      expect(error).toBeNull();
    }
    expect(retrievedPost).not.toBeNull();
    expect(retrievedPost.likes.length).toBe(1);
    expect(retrievedPost.likes[0]).toEqual(myId);
  });

  // Dislike the post
  it('should dislike the post', async () => {
    try {
      let result = await postService.dislike(postDataId, myId);
      expect(result).toBe(true);
    } catch (error) {
      console.log("Error disliking post: " + error);
      expect(error).toBeNull();
    }

    // Check that the post has been disliked
    let retrievedPost;
    try {
      retrievedPost = await postService.getPostById(postDataId);
    } catch (error) {
      console.log("Error retrieving post: " + error);
      expect(error).toBeNull();
    }
    expect(retrievedPost).not.toBeNull();
    expect(retrievedPost.dislikes.length).toBe(1);
    expect(retrievedPost.dislikes[0]).toEqual(myId);
    expect(retrievedPost.likes.length).toBe(0);
  });

});
