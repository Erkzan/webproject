import React, { useState, useEffect } from "react";
import Modall from 'react-bootstrap/Modal';
import "./CommentsModal.css";
import Comments from "../Comments/Comments";
import AddC from "../AddComment/AddComment";
import { ObjectId } from "mongodb";

interface CommentsModalProps {
  show: boolean;
  handleClose: () => void;
  postId: ObjectId;
  displayName: string;
  profilePicture: string;
  postText: string;
}
  
const getCommentsFromPost = async (id: ObjectId) => {
  let response = await fetch("http://localhost:8080/posts/getComments", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  let txtResponse = await response.text();

  let data = JSON.parse(txtResponse);

  return data;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ show, handleClose, postId, displayName, profilePicture, postText }) => {
  const [comments, setComments] = useState([]);
  const [refreshCommentsTrigger, setRefreshCommentsTrigger] = useState(false);

  const refreshComments = () => {
    setRefreshCommentsTrigger(prev => !prev);
  };

  useEffect(() => {
    async function getComments() {
      let data = await getCommentsFromPost(postId);
      setComments(data);
    }
    if (show) {
      getComments();
    }
  }, [show, postId, refreshCommentsTrigger]);
    
return (
  <>
    <Modall show={show} onHide={handleClose} size="xl">
      <Modall.Header className="head"/>
      <Modall.Body>
        <div className="container">
          <div className="left-div">
            <div className="profile-pic" style={{backgroundColor: profilePicture}}></div>
            <div className="username">{displayName}</div>
          </div>
            <div className="right-div">
              <div className="text">{postText}</div>
            </div>
          </div>
          {comments.map((comment: any) => {
            return (
              <Comments 
                key={comment._id}
                commentData={{
                  author: comment.author,
                  text: comment.message,
                  timestamp: comment.timestamp,
                }}
              />
            );
          })}
          <div className="space"></div>
        </Modall.Body>
        <Modall.Footer className="foots">
          <div className="close" onClick={handleClose}>
            Close
          </div>
          <div>
            <AddC commentUnder={postId} onCommentAdded={refreshComments}/>
          </div>
        </Modall.Footer>
      </Modall>
    </>
  );
}

export default CommentsModal;