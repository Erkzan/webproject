import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { PostService } from './PostService'; // Adjust the path as necessary
import { postModel } from '../../db/posts.db'; // Adjust the path as necessary

describe('PostService', () => {
  let mongod: MongoMemoryServer;
  let postService: PostService;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  beforeEach(() => {
    postService = new PostService();
  });

  it('should add a like to a post', async () => {
    // Assuming you have a function to create a post and it returns the created post's ID
    const myId = new mongoose.Types.ObjectId();
    const newPost = await postService.addPost({ /* your post data here, including initial likes if any */ });

    const postId = newPost._id; // Adjust according to how you're handling IDs
    const result = await postService.addLike(postId, myId);

    expect(result).toBe(true); // Ensure the function returns true on success

    const updatedPost = await postModel.findById(postId);
    expect(updatedPost.likes).toContainEqual(myId); // Validate that myId is now in the likes array
  });

  // Additional tests here
});
