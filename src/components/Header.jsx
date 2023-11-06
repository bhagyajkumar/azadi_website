import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useModalStore } from '../lib/zustand';
import { auth } from "../lib/firebase"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Header() {
  const { openModal } = useModalStore()
  const [currentUser, setCurrentUser] = useState(null)


  useEffect(() => {
    auth.onAuthStateChanged(() => {
      setCurrentUser(auth.currentUser)
    })
  }, [])



  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">AZAADI CUCEK</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/notes" className="nav-link">Notes</Link>
            <Link to="/qp" className="nav-link">Question Papers</Link>
            {
              auth.currentUser ?
                <NavDropdown title={currentUser?.email} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => {
                    auth.signOut().then(() => {
                      setCurrentUser(null)
                    })
                  }}>logout</NavDropdown.Item>
                </NavDropdown>
                :
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => {
                    openModal("login")
                  }}>Login</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Signup</NavDropdown.Item>
                </NavDropdown>
            }


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;