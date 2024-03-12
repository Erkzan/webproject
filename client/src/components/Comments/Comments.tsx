import "./Comments.css";



function Comments(props: { commentData: any }) {
  const { commentData } = props;

  let timediff = Date.now() - new Date(commentData.timestamp).getTime();
  timediff = Math.floor(timediff/1000); //mil to sek
  timediff = Math.floor(timediff/60); //sek to min
  let enhet = "m";
  
  if (timediff > 60){
    timediff = Math.floor(timediff/60); //min to hour
    enhet = "h"

    if (timediff > 24){
      timediff = Math.floor(timediff/24); //hour to day
      enhet = "d"
    }
  }

  return (
    <>
      <div className="containers">
        <div className="left-divs">
         <div className="profile-pics" style={{ backgroundColor: commentData.profilePicture }} ></div>
         <div className="timestamp" >{timediff + enhet}</div>
       </div>
      <div className="right-divs">
        <div className="usernames">{commentData.displayName}</div>
        <div className="texts">{commentData.text}</div>
      </div>
    </div>
    </>
  );
}

export default Comments;


