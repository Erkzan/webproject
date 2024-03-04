import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

async function getUsername() {
  console.log("sending cookie details");
  try {
    const response = await fetch("http://localhost:8080/profile/checkLogin", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let txtResponse = await response.text();
    console.log(txtResponse);
    return txtResponse; // Assuming this returns a username if logged in, otherwise an empty string or error
  } catch (error) {
    console.error("Failed to check login status:", error);
    return null; // Indicates an error or not logged in
  }
}

async function logout() {
  try {
    const response = await fetch("http://localhost:8080/profile/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Logged out successfully");
    return true;
  } catch (error) {
    console.error("Failed to logout:", error);
    return false;
  }
}

function NavBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUsername().then((username) => {
      if (username) {
        setIsLoggedIn(true);
        setUsername(username);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      setIsLoggedIn(false);
      setUsername("");
      navigate("/");
      console.log("logged out succesfully");
    } else {
      console.log("Could not log out");
    }
  };

  const handleMouseEvent = (e: React.MouseEvent<HTMLInputElement>) => {
    const inputElement = e.currentTarget as HTMLInputElement;
    inputElement.blur();
    inputElement.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      window.location.href = `/search?query=${encodeURIComponent(
        e.currentTarget.value
      )}`;
    }
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand className="nav-brand">Welcome to Y</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="link" href="/">
              Home
            </Nav.Link>
            <div className="link box_search">
              <Nav.Link>
                <input
                  type="text"
                  className="s_input"
                  name="search"
                  onMouseOut={handleMouseEvent}
                  onKeyDown={handleKeyDown}
                />
                <p>Search</p>
              </Nav.Link>
            </div>
            <Nav.Link className="link" href="/friends">
              Friends
            </Nav.Link>
            {/* Conditional Rendering for Login/My Profile and Logout */}
            {isLoggedIn ? (
              <>
                <Nav.Link className="link" href={"/MyProfile/" + username}>
                  My Profile
                </Nav.Link>
                <Nav.Link className="link" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link className="link" href="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
