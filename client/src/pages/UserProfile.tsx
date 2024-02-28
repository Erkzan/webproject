import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import Post from "../components/Post/Post";

import "./UserProfile.css";

const UserProfile = () => {
  const { username } = useParams();
  // const bio = getFromDatabase(bio(username))
  // const user = getFromDatabase(user(username))
  // const userPosts = getFromdatabase(posts())

  let myPosts = [];

  for (let i = 0; i < 5; i++) {
    myPosts.push(<Post />);
  }
  return (
    <>
      <NavBar />
      <div className="userProfile-page">
        <section className="userProfile-container">
          <div className="userProfile-info">
            <div className="col user-profile-pic">
              <img src="" alt="" />
            </div>

            <div className="col names">
              <p className="row names">"placeholder"</p>
              <p className="row names">{username}</p>
            </div>
          </div>
          <textarea
            className="bio"
            name="bio"
            id="bio"
            placeholder="Add your bio..."
          ></textarea>
        </section>

        <aside className="user_posts">{myPosts}</aside>
      </div>
    </>
  );
};

export default UserProfile;
