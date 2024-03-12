import { ObjectId } from "mongodb";

export interface Profile {
  username: String;
  name: String;
  email: String;
  bio: String;
  posts: ObjectId[];
  profilePicture: String; // Temporary
  shares: ObjectId[];
}
 