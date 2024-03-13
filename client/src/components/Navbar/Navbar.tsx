import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

async function getUsername() {
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
    return txtResponse;
  } catch (error) {
    console.error("Failed to check login status:", error);
    return null;
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
    setTimeout(async () => {
      const result = await logout();
      if (result) {
        setIsLoggedIn(false);
        setUsername("");
        navigate("/login");
      } else {
        console.log("Error logging out");
      }
    }, 0);
  };

  const handleMouseEvent = (e: React.MouseEvent<HTMLInputElement>) => {
    const inputElement = e.currentTarget as HTMLInputElement;
    inputElement.blur();
    inputElement.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const searchQuery = encodeURIComponent(e.currentTarget.value);
      navigate(`/search/${searchQuery}`);
    }
  };
  
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand className="nav-brand" href="/">Welcome to Y</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="link" href="/">
              Home
            </Nav.Link>
            <div className="box_search">
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
            {/* Conditional Rendering for Login/My Profile and Logout */}
            {isLoggedIn ? (
              <>
                <div className="btn-group link">
                  <Nav.Link className="link" href={"/MyProfile/" + username}>
                    My Profile
                  </Nav.Link>
                  <Dropdown>
                    <Dropdown.Toggle
                      split
                      variant="secondary"
                      id="dropdown-split-basic"
                      data-testid="profile-dropdown-toggle"
                    />

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleLogout}>
                        Sign Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
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