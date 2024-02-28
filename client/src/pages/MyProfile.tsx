import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";

import { useEffect, useState } from "react";
import "./MyProfile.css";

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

const MyProfile = () => {
  const { username } = useParams();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(username);
      setUserData(result);
    };
    fetchData();
  }, [username]);

  console.log(userData);

  //let myPosts = userData.profile.posts;
  //let myFriends = userData.profile.friends;

  return (
    <>
      <NavBar />
      <div className="myProfile-page">
        <section className="myProfile-container">
          <div className="myProfile-info">
            <div className="col my-profile-pic">
              <img src="" alt="" />
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
              />
            </div>
          </div>
          <textarea
            className="bio"
            name="bio"
            id="bio"
            placeholder="Add your bio..."
            value={userData?.profile.bio || ""}
          ></textarea>
        </section>

        <aside className="my_posts">{}</aside>
        <aside className="my_friends">{}</aside>
      </div>
    </>
  );
};

export default MyProfile;
