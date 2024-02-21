import NavBar from "../components/Navbar/Navbar";

const Profile = () => {
  return (
    <>
      <NavBar />
      <div className="page">
        <div className="profile-container">
          <div className="profile-info">
            <div className="profile-pic">
              <img src="" alt="" />
            </div>

            <div className="col names">
              <input className="row" type="text" placeholder="Name" />
              <input className="row" type="text" placeholder="Username" />
            </div>
            <textarea name="bio" id="bio"></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
