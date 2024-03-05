import Profile from "../components/Profile/Profile";
import NavBar from "../components/Navbar/Navbar";
import Post from "../components/Post/Post";
import Modal from "../components/Modal/Modal";

const HomePage = () => {

  let posts = [];
  let myFriends = [];

  for(let i = 0; i < 10; i++){
    posts.push(<Post />)
  }

  for(let i = 0; i < 7; i++){
    myFriends.push(<Profile />)
  }

  return (
    <>
      <NavBar/>
      <div className="page">
        <div className="left">
          <div className="post-feed">
            {posts}
          </div>
        </div>
        <aside className="right">
          <div className="friend-feed">
            {myFriends}
          </div>
          <Modal/>
        </aside>
      </div>
    </>
  );
};

export default HomePage;
