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

  if (!txtResponse) {
    console.error('Response from getPostById is empty');
    return;
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
    console.error('Error parsing JSON from getPostById:', error);
    return; 
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
    <NavBar />
      <title>My profile</title>
      <div className="myProfile-page">
        <section className="myProfile-container">
          <div className="myProfile-info">
            <div className="col my-profile-pic">
              <div
                className="user-profile-pic"
                style={{ backgroundColor: userData?.profile.profilePicture }}
              ></div>
              {/*<form className="profile-pic-container" action="/action_page.php">
                <input
                  className="profile-pic-color"
                  type="color"
                  value={userData?.profile.profilePicture || "#ffffff"}
                />
              </form> */}
            </div>

            <div className="col names">
            <input
              className="row names"
              type="text"
              value={userData?.profile.name || ""}
              placeholder="Name"
            />
            <input
              className="row names"
              type="text"
              value={userData?.profile.username || ""}
              placeholder="Username"
              readOnly
            />
            </div>
          </div>
          <textarea
            className="bio"
            name="bio"
            id="bio"
            placeholder="No bio..."
            value={userData?.profile.bio || ""}
          ></textarea>
        </section>

        <aside className="my_posts">
          <div className="my_posts_feed">{userPosts}</div>
        </aside>
      </div>
    </>
  );
};

export default UserProfile;