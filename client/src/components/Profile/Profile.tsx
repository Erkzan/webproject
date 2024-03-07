import { Link } from "react-router-dom";
import classes from "./Profile.module.css";

interface ProfileProps {
  userData: {
    id: string;
    name: string;
    username: string;
    bio: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  return (
    <div className={classes.profile_container}>
      <div className={`col-1 ${classes.profile_pic}`}></div>
      <div className={`col ${classes.profile_info}`}>
        <Link
          to={{ pathname: `/UserProfile/${userData.username}` }}
          className={classes.user}
        >
          {userData.name}
        </Link>
        <p className={classes.username}>{userData.username}</p>
        <div>
          <p className={classes.bio}>{userData.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
