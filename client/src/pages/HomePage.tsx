import Friend from "../components/Friend/Friend";
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
    myFriends.push(<Friend />)
  }

  return (
    <>
      <NavBar />
      <div className="page">
      
        <section className="post-feed">
          {posts}
        </section>
        <aside className="friend-feed">
          {myFriends}
          <Modal/>
        </aside>
      </div>
    </>
  );
};

export default HomePage;
