import NavBar from "../components/Navbar/Navbar";
import Post from "../components/Post/Post";

import "./Profile.css";

const Profile = () => {

  let myPosts = [];

  for(let i = 0; i < 5; i++){
    myPosts.push(<Post />)
  }
  return (
    <>
      <NavBar />
      <div className="profile-page">
        <section className="profile-container">
          <div className="profile-info">
            <div className="col your-profile-pic">
              <img src="" alt="" />
            </div>

            <div className="col names">
              <input className="row names" type="text" placeholder="Name" />
              <input className="row names" type="text" placeholder="Username" />
            </div>
          </div>
          <textarea
            className="bio"
            name="bio"
            id="bio"
            placeholder="Add your bio..."
          ></textarea>
        </section>

        <aside className="your-posts">
          {myPosts}
        </aside>
      </div>
    </>
  );
};

export default Profile;