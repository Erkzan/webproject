import "./Post.css";

function Post() {
  return (
    <div className="post-container">
      <div className="col-1">
        <div className="profile-pic"></div>
        <div className="timestamp">12h</div>
      </div>
      <div className="col content-container">
        <div className="user">Erik Karlsson</div>
        <div className="post-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, eum
          non. Saepe, iure voluptatibus consequatur, quos ex laboriosam fugiat
          deserunt similique itaque esse ipsam dolores nisi expedita tempora
          architecto quia?
        </div>
        <div className="post-pic"></div>
        <footer className="container-fluid">
          <button className="col interaction like_button"></button>
          <button className="col interaction dislike_button"></button>
          <button className="col interaction comment_button"></button>
          <button className="col interaction share_button"></button>
          <button className="col interaction save_button"></button>
        </footer>
      </div>
    </div>
  );
}

export default Post;
