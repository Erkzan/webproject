import Friend from "../components/Friend/Friend";
import NavBar from "../components/Navbar/Navbar";
import Post from "../components/Post/Post";
import Friendprofiles from "../components/Friendprofiles/Friendprofiles";
import "./Friends.css";

const Friends = () => {

    let myFriends = [];

    for(let i = 0; i < 12; i++){
        myFriends.push( <Friendprofiles/>)
    }

    return (
        <>
            <NavBar/>
            <header></header>
            <div className="page">
                <div className="row">
                    {myFriends}
                </div>
            </div>
        </>
    );
};

export default Friends;