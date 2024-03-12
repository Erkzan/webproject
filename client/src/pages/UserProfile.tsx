import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import Post from "../components/Post/Post";
import { ObjectId } from "mongodb";


import "./UserProfile.css";
import { useEffect, useState } from "react";

async function getProfile(username: string | undefined) {
  let response = await fetch("http://localhost:8080/profile/getProfile", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  let txtResponse = await response.text();
  let profile = JSON.parse(txtResponse);

  return profile;
}


async function getPost(id: ObjectId) {
  let response = await fetch("http://localhost:8080/posts/getPostById", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  let txtResponse = await response.text();

  // Check if txtResponse is not empty
  if (!txtResponse) {
    console.error('Response from getPostById is empty');
    return; // Optionally, return a default value or handle the error as needed
  }

  try {
    let post = JSON.parse(txtResponse);
    let dataC = {
      message: post.message,
      author: post.author,
      name: post.name,
      likes: post.likes,
      dislikes: post.dislikes,
      timestamp: post.timestamp,
      _id: post._id,
    };

    return <Post postData={dataC} />;
  } catch (error) {
    // Handle or log the error
    console.error('Error parsing JSON from getPostById:', error);
    return; // Optionally, return a default value or handle the error as needed
  }
}


const UserProfile = () => {
  const { username } = useParams();

  const [userData, setUserData] = useState<any>(null);
  const [userPostIds, setUserPostIds] = useState<any>([]);
  const [userPosts, setUserPosts] = useState<any>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await getProfile(username);
      setUserData(result);
    } 
    fetchData();
  }, [username]);

  useEffect(() => {
    if (userData) {
      const postIds = userData.profile.posts;
      setUserPostIds(postIds);
    }
  }, [userData]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (userPostIds.length > 0) {
        const posts = await Promise.all(userPostIds.map((id: ObjectId) => getPost(id)));
        setUserPosts(posts.reverse());
      }
    };
  
    fetchPosts();
  }, [userPostIds]);

  return (
    <>
    <title>{username + "'s profile"}</title>
      <NavBar />
      <div className="userProfile-page">
        <section className="userProfile-container">
          <div className="userProfile-info">
            <div className="col user-profile-pic">
              <img src="" alt="" />
            </div>

            <div className="col names">
              <p className="row names">{userData?.profile.name}</p>
              <p className="row names">{userData?.profile.username}</p>
            </div>
          </div>
          <textarea
            className="bio"
            name="bio"
            id="bio"
            placeholder="Add your bio..."
            readOnly
          >{userData?.profile.bio}</textarea>
        </section>

        <aside className="user_posts">{userPosts}</aside>
      </div>
    </>
  );
};

export default UserProfile;
