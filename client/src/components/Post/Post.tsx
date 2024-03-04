import { Link } from "react-router-dom";
import { useState } from 'react';
import Modall from 'react-bootstrap/Modal';
import classes from "./Post.module.css";
import Comments from "../Comments/Comments";
import CommentsModal from "../CommentsModal/CommentsModal";

function Post() {
  let username = "erikkarlsson";

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={classes.post_container}>
      <div className="col-1">
        <div className={classes.profile_pic}></div>
        <div className={classes.timestamp}>12h</div>
      </div>
      <div className={`col ${classes.content_container}`}>
        <Link
          className={classes.user}
          to={{ pathname: `/UserProfile/${username}` }}
        >
          Erik Karlsson
        </Link>
        <p>{username}</p>
        <div className={classes.post_text}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, eum
          non. Saepe, iure voluptatibus consequatur, quos ex laboriosam fugiat
          deserunt similique itaque esse ipsam dolores nisi expedita tempora
          architecto quia?
        </div>
        <div className={classes.post_pic}></div>
        <footer className="">
        <button
            className={`col ${classes.interaction} ${classes.like_button}`}
          ></button>
          <button
            className={`col ${classes.interaction} ${classes.dislike_button}`}
          ></button>
          <button onClick={handleShow}
            className={`col ${classes.interaction} ${classes.comment_button}`}
          ></button>
          <CommentsModal show={show} handleClose={handleClose}/>
          <button
            className={`col ${classes.interaction} ${classes.share_button}`}
          ></button>
          <button
            className={`col ${classes.interaction} ${classes.save_button}`}
          ></button>
        </footer>
      </div>
    </div>
  );
}

export default Post;
