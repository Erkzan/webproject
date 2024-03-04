import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

async function getUsername() {
  console.log("sending cookie details");
  
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

      let txtResponse = await response.text()
      console.log(txtResponse);
}

function NavBar() {
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
            <Nav.Link className="link" href="/MyProfile">
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
