import { useParams } from "react-router-dom";
import Modal from "../components/Modal/Modal";
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

  let data = JSON.parse(txtResponse);

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

  const [color, setColor] = useState("#ffffff"); // Initial color

  const handleColorChange = async (e: { target: { value: typeof color } }) => {
    setColor(e.target.value);
    console.log(e.target.value);
    await fetch("http://localhost:8080/profile/changeProfilePic", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: e.target.value }),
    });
  };

  return (
    <>
      <NavBar />
      <title>My profile</title>
      <div className="myProfile-page">
        <section className="myProfile-container">
          <div className="myProfile-info">
            <div className="col my-profile-pic">
              <form className="profile-pic-container" action="/action_page.php">
                <input
                  className="profile-pic-color"
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                />
              </form>
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
              onChange={(e) => setUserData({
                ...userData,
                profile: {
                  ...userData.profile,
                  username: e.target.value
                }
              })}
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
          ></textarea>
        </section>

        <aside className="my_posts">
          <div className="my_posts_feed">{}</div>
          <Modal />
        </aside>
      </div>
    </>
  );
};

export default MyProfile;
