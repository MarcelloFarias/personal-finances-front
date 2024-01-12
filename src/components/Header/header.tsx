import { Navbar, Container } from "react-bootstrap";
import './style.scss';

const Header = () => {
    return (
        <Navbar className="header">
            <Container style={{height: "10vh"}} className="d-flex justify-content-end">
                <Navbar.Brand>
                    <h2>WiseSpent</h2>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;