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

    let jsonResponse = await response.json(); // Parse the JSON response
    console.log(jsonResponse);
    return jsonResponse.name; // Return just the display name
  } catch (error) {
    console.error("Failed to fetch username:", error);
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

  let postsPromises = data.map(async (current: any) => {
    let name = await getUsername(current.authorId);

    let dataC = {
      message: current.message,
      author: current.author,
      name: name,
      likes: current.likes,
      dislikes: current.dislikes,
    };

    return <Post postData={dataC} />;
  });

  let posts = await Promise.all(postsPromises);

  console.log(posts);

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

  console.log(jsonResponse);

  let users = jsonResponse.map((user: any) => {
    return <Profile key={user.id} userData={user} />;
  });

  console.log(users);

  return users;
}

const HomePage = () => {
  // Use useState to hold the fetched posts
  const [posts, setPosts] = useState<React.ReactNode[]>([]); // Initialize with an empty array
  const [allUsers, setAllUsers] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      console.log(fetchedPosts);
      setPosts(fetchedPosts.reverse()); // Update the state with the fetched posts
    };

    fetchPosts();

    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      console.log(fetchedUsers);
      setAllUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <title>Welcome to Y</title>
      <NavBar />
      <div className="page">
        <section className="post-feed">
          {/* Render posts from state */}
          {posts}
        </section>
        <aside className="right">
          <div className="user-feed">{allUsers}</div>
          <Modal />
        </aside>
      </div>
    </>
  );
};

export default HomePage;
