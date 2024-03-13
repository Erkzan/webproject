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

    let jsonResponse = await response.json();

    return jsonResponse.name;
  } catch (error) {
    console.error("Failed to fetch username:", error);
    return null;
  }
}

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

  let data = JSON.parse(txtResponse);

  let postsPromises = data.map(async (current: any) => {
    let name = await getUsername(current.authorId);

    let dataC = {
      message: current.message,
      author: current.author,
      name: name,
      likes: current.likes,
      dislikes: current.dislikes,
      timestamp: current.timestamp,
      _id: current._id,
    };

    return <Post key={current._id} postData={dataC} />;
  });

  let posts = await Promise.all(postsPromises);

  return posts;
}

async function getAllUsers() {
  let response = await fetch("http://localhost:8080/profile/getAll", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let txtResponse = await response.text();

  if (!txtResponse) {
    throw new Error("No data received from server");
  }

  let jsonResponse;
  try {
    jsonResponse = JSON.parse(txtResponse);
  } catch (error) {
    throw new Error("Received data is not in JSON format");
  }

  let users = jsonResponse.map((user: any) => {
    return <Profile key={user._id} userData={user} />;
  });

  return users;
}

const HomePage = () => {
  // Use useState to hold the fetched posts
  const [posts, setPosts] = useState<React.ReactNode[]>([]);
  const [allUsers, setAllUsers] = useState<React.ReactNode[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const refreshPosts = () => {
    setRefreshTrigger((prev) => !prev);
  };

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts.reverse());
    };

    fetchPosts();

    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setAllUsers(fetchedUsers);
    };

    fetchUsers();
    // Re-render on refreshTrigger change
  }, [refreshTrigger]);

  return (
    <>
      <title>Welcome to Y</title>
      <NavBar />
      <div className="page">
        <section className="post-feed">{posts}</section>
        <aside className="right">
          <Modal onPostAdded={refreshPosts} />
          <div className="user-feed">{allUsers}</div>
        </aside>
      </div>
    </>
  );
};

export default HomePage;
