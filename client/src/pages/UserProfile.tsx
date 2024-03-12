import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import Post from "../components/Post/Post";

import "./UserProfile.css";
import { useEffect, useState } from "react";

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

  console.log("txtResponse:" + txtResponse);
  let data = JSON.parse(txtResponse);

  console.log(data);

  return data;
}

const UserProfile = () => {
  const { username } = useParams();

  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(username);
      setUserData(result);
    };
    fetchData();
  }, [username]);


  // const bio = getFromDatabase(bio(username))
  // const user = getFromDatabase(user(username))
  // const userPosts = getFromdatabase(posts())

  console.log("userData: " + JSON.stringify(userData));
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

        <aside className="user_posts">{userData?.profile.posts}</aside>
      </div>
    </>
  );
};

export default UserProfile;
