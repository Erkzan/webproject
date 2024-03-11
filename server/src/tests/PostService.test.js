const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
import { postModel } from '../../db/posts.db';

describe('Database Connection Test', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log("Connecting to URI:", uri); // Confirm URI is correct
    await mongoose.connect(uri);
  }, 60000); // Increase timeout for beforeAll hook to ensure there's enough time for setup

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  }, 60000); // Increase timeout for afterAll hook to ensure there's enough time for cleanup

  describe('Post Creation and Retrieval', () => {
    it('should establish a MongoDB connection', async () => {
      const connectionState = mongoose.connection.readyState;
      expect(connectionState).toBe(1); // 1 for connected
    }, 60000); // Increase timeout for this test

    it('should create a new post and retrieve it', async () => {
      const postData = {
        message: 'Test Message',
        author: 'Test Author',
        authorId: new mongoose.Types.ObjectId().toString(), 
        likes: [],
        dislikes: [],
        shares: []
      };
  
      // Create the post
      const newPost = new postModel(postData);
      console.log("New Post:", newPost); // Log the new post for debugging
      let result = null;
      try {
        const collection = mongoose.connection.collection('posts');
        result = await collection.insertOne(postData);
        console.log("Direct insertion result:", result);
      } catch (error) {
        console.error("Direct insertion failed:", error);
      }
      
      // Retrieve the post
      const postId = result.insertedId;
      let foundPost = null;
      try {
        foundPost = await postModel.findById(postId);
        console.log("Found post:", foundPost);
      } catch (error) {
        console.error("Error retrieving post:", error);
      }
      

      console.log("Found Post:", foundPost); // Log the found post for debugging
      
      // Assertions to confirm post creation and retrieval
      expect(foundPost).not.toBeNull();
      expect(foundPost.message).toEqual(postData.message);
      expect(foundPost.author).toEqual(postData.author);
    }, 60000); // Increase timeout for this test
  });
  
});
