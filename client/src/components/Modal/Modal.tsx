import React, { useState } from "react";
import Modall from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

function Modal() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  async function getUsername() {
    console.log("sending cookie details");
    try {
      const response = await fetch("http://localhost:8080/profile/checkLogin", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
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

  const handleSubmit = async () => {
    let user = await getUsername();

    console.log("user: " + user);

    if (!user) {
      navigate("/login");
    }

    // Send text via fetch
    await fetch("http://localhost:8080/posts/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        message: text,
        username: user,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let txtData = await response.text();
        console.log("response ok: " + txtData);

        return txtData;
      })
      .then((data) => {
        console.log("Data received:", data);
        handleClose(); // Close the modal after successful submission

        if (data === "loginError") {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
    window.location.reload();
  };

  return (
    <>
      <div className="button" onClick={handleShow}>
        +
      </div>
      <div className="buttonhover"></div>
      <Modall show={show} onHide={handleClose} size="xl">
        <Modall.Header className="head">
          <Modall.Title className="headtext">New Post</Modall.Title>
        </Modall.Header>
        <Modall.Body>
          <div className="profile"></div>
          <textarea
            className="text"
            placeholder="Write..."
            value={text}
            onChange={handleChange}
          ></textarea>
        </Modall.Body>
        <Modall.Footer className="foot">
          <div className="close" onClick={handleClose}>
            Close
          </div>
          <div className="post" onClick={handleSubmit}>
            Post
          </div>
        </Modall.Footer>
      </Modall>
    </>
  );
}

export default Modal;
