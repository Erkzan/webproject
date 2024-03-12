import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import Profile from "../components/Profile/Profile";

import classes from "./Search.module.css";

async function getSearch(search:String) {
  let response = await fetch("http://localhost:8080/profile/getSearchedProfiles", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search }),
  });
  
  let txtResponse = await response.text();

  console.log(txtResponse);
  // Check if txtResponse is not empty
  if (!txtResponse) {
    console.error('Response from getPostById is empty');
    return null; // Optionally, return a default value or handle the error as needed
  }

  
  let profiles = JSON.parse(txtResponse);
    
  console.log(profiles);
  return profiles;  //an array of profiles
}

const Search = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [foundProfiles, setFoundProfiles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        let result = await getSearch(query);
        setSearchResults(result);
      } else {
        setSearchResults([]);
      }
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    if (searchResults) {
      let profiles = searchResults.map((profile: any) => {
        return <Profile key={profile._id} userData={profile} />;
      });
      setFoundProfiles(profiles);
    }
  }, [searchResults]);

  return (
    <>
    <title>Search</title>
      <Navbar />
      

      <div className={classes.usersContainer}>{foundProfiles}</div>
      <div className={classes.postsContainer}></div>
    </>
  );
};

export default Search;
