import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserCard from './UserCard';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Navigation({ user }) {
    const { logoutUser } = useContext(AuthContext);
    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Eat What Tonight?</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="justify-content-end" style={{ "width": "100%" }}>
                    {user ? (
                        <NavDropdown title={user.username} id="log-out-nav">
                            <NavDropdown.Item onClick={logoutUser} style={{"margin": "auto"}}>
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                    <NavDropdown title="Log in" id="basic-nav-dropdown">
                        <UserCard />
                    </NavDropdown>
                    )}
                    
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default Navigation;