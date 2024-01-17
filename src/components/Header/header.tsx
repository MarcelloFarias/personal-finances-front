import { Navbar, Container, Nav } from "react-bootstrap";
import './style.scss';

const Header = () => {
    return (
        <Navbar className="header">
            <Container style={{height: "10vh"}} className="d-flex">
                <Navbar.Brand>
                    <h2>WiseSpent</h2>
                </Navbar.Brand>

                <Nav>
                    <Nav.Link href="#">Gastos</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;