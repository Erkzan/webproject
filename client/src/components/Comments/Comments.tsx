import React, { useEffect, useState } from "react";
import "./Comments.css";

async function getUserData(username: string) {
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

function Comments(props: { commentData: any }) {
  const { commentData } = props;
  const [userData, setUserData] = useState<any>(null);

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

  useEffect(() => {
    async function fetchData() {
      let data = await getUserData(commentData.author);
      setUserData(data);
    }
    fetchData();
  }, [commentData.author]);

  return (
    <>
      <div className="containers">
        <div className="left-divs">
         <div className="profile-pics" style={{ backgroundColor: userData.profile.profilePicture }} ></div>
         <div className="timestamp" >{timediff + enhet}</div>
       </div>
      <div className="right-divs">
        <div className="usernames">{userData.profile.name}</div>
        <div className="texts">{commentData.text}</div>
      </div>
    </div>
    </>
  );
}

export default Comments;


