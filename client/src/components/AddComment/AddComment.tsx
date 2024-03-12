import { useState } from "react";
import Modall from "react-bootstrap/Modal";
import "../AddComment/AddComment.css";
import { useNavigate } from "react-router-dom";
import { ObjectId } from "mongodb";

function AddComment(props: { commentUnder: ObjectId; onCommentAdded: () => void; }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const handleClose = () => {setShow(false) ; setText("")};
  const handleShow = () => setShow(true);
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

  const addComment = async () => {
    let user = await getUsername();

    if (!user) {
      navigate("/login");
    }

    // Send text via fetch
    await fetch("http://localhost:8080/posts/addComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        message: text,
        username: user,
        commentUnder: props.commentUnder,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          props.onCommentAdded()
        }

        let txtData = await response.text();
        return txtData;
      })
      .then((data) => {
        handleClose(); // Close the modal after successful submission

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
      <button className="Cbutton" onClick={handleShow}>
        Add Comment
      </button>
      <div className="Cbuttonhover"></div>
      <Modall show={show} onHide={handleClose} size="xl">
        <Modall.Header className="Chead">
          <Modall.Title className="Cheadtext">Add Comment</Modall.Title>
        </Modall.Header>
        <Modall.Body className="addCommentContainer">
          <textarea 
            className="Ctext" 
            placeholder="Write..."
            onChange={handleChange}
            value={text}
            ></textarea>
        </Modall.Body>
        <Modall.Footer className="Cfoot">
          <button className="Cclose" onClick={handleClose}>
            Close
          </button>
          <button className="Cpost" onClick={addComment}>
            Add Comment
          </button>
        </Modall.Footer>
      </Modall>
    </>
  );
}

export default AddComment;
