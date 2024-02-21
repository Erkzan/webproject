import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Post from "../components/Post/Post";
import Friend from "../components/Friend/Friend";

const HomePage = () => {
    return (
      <>
        <Navbar />
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
    )
}

export default HomePage;