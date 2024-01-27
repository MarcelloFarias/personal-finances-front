import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import './style.scss';

interface HeaderProps {
    toggleLogoutModalVisibility: () => void,
    togglePersonalDataModalVisibility: () => void
}

const Header = ({ toggleLogoutModalVisibility, togglePersonalDataModalVisibility }: HeaderProps) => {
    return (
        <Navbar className="header">
            <Container style={{ height: "10vh" }} className="d-flex">
                <Navbar.Brand>
                    <h2>WiseSpent</h2>
                </Navbar.Brand>

                <Nav>
                    <Dropdown drop="start">
                        <Dropdown.Toggle variant="" className="fs-2 d-flex align-items-center border-0">
                            <FaUserCircle />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={togglePersonalDataModalVisibility}>Dados pessoais</Dropdown.Item>
                            <Dropdown.Item className="text-danger" onClick={toggleLogoutModalVisibility}>Sair</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;