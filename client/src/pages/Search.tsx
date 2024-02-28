import Profile from "../components/Profile/Profile";
import Navbar from "../components/Navbar/Navbar";

import classes from "./Search.module.css";

const Search = () => {
  return (
    <>
      <Navbar />

      <div className={classes.container}>
        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
      </div>
    </>
  );
};

export default Search;
