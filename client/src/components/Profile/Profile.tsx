import { Link } from "react-router-dom";
import classes from "./Profile.module.css";

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

interface ProfileProps {
  userData: {
    profilePicture: any;
    id: string;
    name: string;
    username: string;
    bio: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {

  return (
    <div className={classes.profile_container}>
      <div
        className={`col-1 ${classes.profile_pic}`}
        style={{ backgroundColor: userData.profilePicture }}
      ></div>
      <div className={`col ${classes.profile_info}`}>
        <Link
          to={{ pathname: `/UserProfile/${userData.username}` }}
          className={classes.user}
        >
          {userData.name}
        </Link>
        <p className={classes.username}>{userData.username}</p>
          <p className={classes.bio}>{userData.bio}</p>    
      </div>
    </div>
  );
};

export default Profile;