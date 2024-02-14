import React from "react";
import ReactDOM from "react-dom/client";
import Friend from "./components/Friend/Friend";
import Navbar from "./components/Navbar/Navbar";
import Post from "./components/Post/Post";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
