import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import './style.scss';

const Header = ({toggleSideMenuVisibility}: any) => {
    return (
        <Navbar className="header">
            <Container style={{height: "10vh"}} className="d-flex">
                <Navbar.Brand>
                    <h2>WiseSpent</h2>
                </Navbar.Brand>

                <Nav>
                    <Button variant="" className="fs-1" onClick={toggleSideMenuVisibility}>
                        <FaUserCircle/>
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;