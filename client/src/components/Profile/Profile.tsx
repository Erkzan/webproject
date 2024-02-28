import { Link } from "react-router-dom"; // Import Link from react-router-dom

import classes from "./Profile.module.css";

function Profile() {
  // Assuming username is obtained from props or state
  const user = "Milton Niklasson";
  const username = "miltonniklasson";
  const bio = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hicofficiis fugiat excepturi eius voluptatibus aspernatur.";

  // const bio = getFromDatabase(bio(username))
  // const user = getFromDatabase(user(username))


  return (
    <div className={classes.profile_container}>
      <div className={`col-1 ${classes.profile_pic}`}></div>
      <div className={`col ${classes.profile_info}`}>
        <Link
          to={{ pathname: `/UserProfile/${username}`}}
          className={classes.user}
        >
          {user}
        </Link>
        <p className={classes.username}>{username}</p>
        <div>
          <p className={classes.bio}>{bio}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
