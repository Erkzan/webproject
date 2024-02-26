import Friend from "../components/Friend/Friend";
import NavBar from "../components/Navbar/Navbar";
import Post from "../components/Post/Post";
import Friendprofiles from "../components/Friendprofiles/Friendprofiles";
import "./Friends.css";

const Friends = () => {
    return (
        <>
            <NavBar/>
            <header></header>
            <div className="page">
                <div className="row">
                    <Friendprofiles/>
                    <Friendprofiles/>
                    <Friendprofiles/>
                    <Friendprofiles/>
                    <Friendprofiles/>
                    <Friendprofiles/>
                    <Friendprofiles/>
                    <Friendprofiles/>
                    <Friendprofiles/>
                    <Friendprofiles/>
                    <Friendprofiles/>
                    <Friendprofiles/>
                </div>
            </div>
        </>
    );
};

export default Friends;