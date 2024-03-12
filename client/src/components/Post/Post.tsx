import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentsModal from "../CommentsModal/CommentsModal";
import classes from "./Post.module.css";

function Post(props: { postData: any }) {
  const { postData } = props;
  let timediff = Date.now() - new Date(postData.timestamp).getTime();
  timediff = Math.floor(timediff/1000); //milli to sec
  timediff = Math.floor(timediff/60); //sec to min
  let enhet = "m";
  
  if (timediff > 60){
    timediff = Math.floor(timediff/60); //min to hour
    enhet = "h"

    if (timediff > 24){
      timediff = Math.floor(timediff/24); //hour to day
      enhet = "d"
    }
  }

  async function getData(username: string | undefined) {
    let response = await fetch("http://localhost:8080/profile/getProfile", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
  
    let txtResponse = await response.text();
  
    let data = JSON.parse(txtResponse);
  
    return data;
  }

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [profilePicture, setProfilePic] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const refreshStats = () => {
    setRefreshTrigger(prev => !prev);
  };

  useEffect(() => {
    async function getStats() {
      let res = await fetch("http://localhost:8080/posts/getPostStats", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: postData._id }),
      });

      let stats = await res.json();

      setLikes(stats.likes);
      setDislikes(stats.dislikes);
      setShares(stats.shares);
    }
    getStats();
  }, [refreshTrigger]);

  useEffect(() => {
    async function getProfilePic() {
      let data = await getData(postData.author);
      setProfilePic(data.profile.profilePicture);
    }
    getProfilePic();
  }, []);

  return (
    <div className={classes.post_container}>
      <div className="col-1">
        <div className={classes.profile_pic} style={{ backgroundColor: profilePicture }}></div>
        <div className={classes.timestamp}>{timediff + enhet}</div>
      </div>
      <div className={`col ${classes.content_container}`}>
        <Link
          className={classes.user}
          to={{ pathname: `/UserProfile/${postData.author}` }}
        >
          {postData.name}
        </Link>
        <p>{postData.author}</p>
        <div className={classes.post_text}>{postData.message}</div>
        <div className={classes.post_pic}></div>
        <footer className="">
          <button
            className={`col ${classes.interaction} ${classes.like_button}`}
            onClick={async () => {
                let response = await fetch("http://localhost:8080/posts/addLike", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: postData._id }),
              });

              if (response.ok) {
                refreshStats();
              }
            }}
          ></button>
          <div>{likes}</div>
          <button
            className={`col ${classes.interaction} ${classes.dislike_button}`}
            onClick={async () => {
                let response = await fetch("http://localhost:8080/posts/addDislike", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: postData._id }),
              });

              if (response.ok) {
                refreshStats();
              }
            }}
          ></button>
          <div>{dislikes}</div>
          <button
            onClick={handleShow}
            className={`col ${classes.interaction} ${classes.comment_button}`}
          ></button>
          <CommentsModal 
            show={show} 
            handleClose={handleClose} 
            postId={postData._id}
            displayName={postData.name}
            profilePicture={profilePicture}
            postText={postData.message}
          />
          <button
            className={`col ${classes.interaction} ${classes.share_button}`}
            onClick={async () => {
                let response = await fetch("http://localhost:8080/posts/share", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: postData._id }),
              });

              if (response.ok) {
                refreshStats();
              }
            }}
          ></button>
          <div>{shares}</div>
        </footer>
      </div>
    </div>
  );
}

export default Post;