import Friend from "../components/Friend/Friend";
import NavBar from "../components/Navbar/Navbar";
import Post from "../components/Post/Post";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="page">
        <section className="post-feed">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </section>
        <aside className="friend-feed">
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
        </aside>
      </div>
    </>
  );
};

export default HomePage;
