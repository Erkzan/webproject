import { useState } from "react";
import { Link } from "react-router-dom";
import CommentsModal from "../CommentsModal/CommentsModal";
import classes from "./Post.module.css";

function Post(props: { postData: any }) {
  const { postData } = props;

  console.log(postData);

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
          ></button>
          <button
            className={`col ${classes.interaction} ${classes.dislike_button}`}
          ></button>
          <button
            onClick={handleShow}
            className={`col ${classes.interaction} ${classes.comment_button}`}
          ></button>
          <CommentsModal show={show} handleClose={handleClose} />
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
