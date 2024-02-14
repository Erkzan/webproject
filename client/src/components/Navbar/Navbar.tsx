import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

function NavBar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home" className="nav-brand">
          Welcome to Y
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="link" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="link" href="#search">
              Search
            </Nav.Link>
            <Nav.Link className="link" href="#friends">
              Friends
            </Nav.Link>
            <Nav.Link className="link" href="#profile">
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
