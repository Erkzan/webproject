import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Profile from "../components/Profile/Profile";

import classes from "./Search.module.css";

async function getSearch(search: String) {
  let response = await fetch(
    "http://localhost:8080/profile/getSearchedProfiles",
    {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    }
  );

  let txtResponse = await response.text();

  if (!txtResponse) {
    console.error("Response from getPostById is empty");
    return null;
  }

  let profiles = JSON.parse(txtResponse);

  return profiles;
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
        return(<div className={classes.profileContainer}><Profile key={profile._id} userData={profile} /></div>);
      });
      setFoundProfiles(profiles);
    }
  }, [searchResults]);

  return (
    <>
      <title>Search</title>
      <Navbar />
      <div className={classes.usersContainer}>{foundProfiles}</div>
    </>
  );
};

export default Search;