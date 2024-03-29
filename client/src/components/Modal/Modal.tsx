import React, { useState } from "react";
import Modall from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

function Modal(props: { onPostAdded: () => void }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const handleClose = () => {
    setShow(false);
    setText("");
  };
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  async function getUsername() {
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
      return txtResponse;
    } catch (error) {
      console.error("Failed to check login status:", error);
      return null;
    }
  }

  const handleSubmit = async () => {
    let user = await getUsername();

    if (!user) {
      navigate("/login");
    }

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
        } else {
          props.onPostAdded();
        }

        let txtData = await response.text();
        return txtData;
      })
      .then((data) => {
        handleClose();

        if (data === "loginError") {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };

  return (
    <>
      <button className="addPost" onClick={handleShow}>
        <p className="addPostText">Add Post</p>
        <div className="button">+</div>
      </button>

      <div className="buttonhover"></div>
      <Modall show={show} onHide={handleClose} size="xl">
        <Modall.Header className="head">
          <Modall.Title className="headtext">New Post</Modall.Title>
        </Modall.Header>
        <Modall.Body className="addText">
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
