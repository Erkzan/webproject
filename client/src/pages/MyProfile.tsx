import { useParams } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import NavBar from "../components/Navbar/Navbar";

import { useEffect, useState } from "react";
import "./MyProfile.css";
import { ObjectId } from "mongodb";
import Post from "../components/Post/Post";

async function getData(username: string | undefined) {
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

  let data = JSON.parse(txtResponse);

  return data;
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

    return <Post key={post._id} postData={dataC} />;
  } catch (error) {
    console.error('Error parsing JSON from getPostById:', error);
    return;
  }
}

const MyProfile = () => {
  const { username } = useParams();

  const [userData, setUserData] = useState<any>(null);
  const [userPostIds, setUserPostIds] = useState<any>([]);
  const [userPosts, setUserPosts] = useState<any>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const refreshPosts = () => {
    setRefreshTrigger(prev => !prev);
  };
  
  useEffect(() => {
    if (userData) {
      const postIds = userData.profile.posts;
      setUserPostIds(postIds);
    }
  }, [userData, refreshTrigger]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (userPostIds.length > 0) {
        const posts = await Promise.all(userPostIds.map((id: ObjectId) => getPost(id)));
        setUserPosts(posts.reverse());
      }
    };
  
    fetchPosts();
    // Re-render on refreshTrigger changes
  }, [userPostIds, refreshTrigger]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(username);
      setUserData(result);
    };
    fetchData();
  }, [refreshTrigger]);

  async function changeProfile(){
      let response = await fetch("http://localhost:8080/profile/changeProfile", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData.profile),
    });

    if (response.ok) {
      refreshPosts();
      window.location.reload();
    }
  }

  return (
    <>
      <NavBar />
      <title>My profile</title>
      <div className="myProfile-page">
        <section className="myProfile-container">
          <div className="myProfile-info">
            <div className="col my-profile-pic">
              <div className="profile-pic-color" style={{backgroundColor: userData?.profile.profilePicture}}></div>
              <div className="color-picker">
                <p>Change color: <input className="picker" type="color" value={userData?.profile.profilePicture || "#ffffff"}
                  onChange={(e) => setUserData({
                    ...userData,
                    profile: {
                      ...userData.profile,
                      profilePicture: e.target.value
                    }
                  })} /></p>
              </div>
            </div>

            <div className="col names">
            <input
              className="row names"
              type="text"
              value={userData?.profile.name || ""}
              placeholder="Name"
              onChange={(e) => setUserData({
                ...userData,
                profile: {
                  ...userData.profile,
                  name: e.target.value
                }
              })}
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
            placeholder="Add your bio..."
            value={userData?.profile.bio || ""}
            onChange={(e) => setUserData({
              ...userData,
              profile: {
                ...userData.profile,
                bio: e.target.value
              }
            })}
          />
          <button onClick={changeProfile} className="save">Save</button>
        </section>

        <aside className="my_posts">
          <Modal onPostAdded={refreshPosts} />
          <div className="my_posts_feed">{userPosts}</div>
        </aside>

      </div>
    </>
  );
};

export default MyProfile;