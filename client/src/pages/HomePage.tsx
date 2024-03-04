import React, { useEffect, useState } from "react";
import Modal from "../components/Modal/Modal";
import NavBar from "../components/Navbar/Navbar";
import Post from "../components/Post/Post";
import Profile from "../components/Profile/Profile";

async function getUsername(_id: any) {
  try {
    const response = await fetch("http://localhost:8080/profile/getNameById", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: _id }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let txtResponse = await response.text();
    console.log(txtResponse);
    return txtResponse; // Assuming this returns a username if logged in, otherwise an empty string or error
  } catch (error) {
    console.error("Failed to check login status:", error);
    return null; // Indicates an error or not logged in
  }
}

// Assuming getAllPosts remains the same
async function getAllPosts() {
  let response = await fetch("http://localhost:8080/posts/getAll", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let txtResponse = await response.text();

  console.log("txtResponse:" + txtResponse);
  let data = JSON.parse(txtResponse);

  console.log(data);

  let posts: any[] = [];

  data.forEach(async (current: any) => {
    let name = await getUsername(current.authorId);

    let dataC = {
      message: current.message,
      author: current.author,
      name: name,
    };

    posts.push(<Post postData={dataC} />);
  });

  console.log(posts);

  return posts;
}

const HomePage = () => {
  // Use useState to hold the fetched posts
  const [posts, setPosts] = useState<React.ReactNode[]>([]); // Initialize with an empty array
  const [myFriends, setMyFriends] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      console.log(fetchedPosts);
      setPosts(fetchedPosts); // Update the state with the fetched posts
    };

    fetchPosts();

    // Populate myFriends state
    const friends: React.ReactNode[] = [];
    for (let i = 0; i < 7; i++) {
      friends.push(<Profile key={i} />); // It's good practice to use a key when rendering lists
    }
    setMyFriends(friends);
  }, []); // The empty array means this effect runs once on mount

  return (
    <>
      <NavBar />
      <div className="page">
        <section className="post-feed">
          {/* Render posts from state */}
          {posts}
        </section>
        <aside className="friend-feed">
          {/* Render friends from state */}
          {myFriends}
          <Modal />
        </aside>
      </div>
    </>
  );
};

export default HomePage;
