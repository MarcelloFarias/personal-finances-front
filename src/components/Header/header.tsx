import { useContext } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import ToggleThemeSwitch from "../ToggleThemeSwitch/toggleThemeSwitch";
import { ThemeContext } from "../../contexts/themeContext";

interface HeaderProps {
    toggleLogoutModalVisibility: () => void,
    togglePersonalDataModalVisibility: () => void
}

const Header = ({ toggleLogoutModalVisibility, togglePersonalDataModalVisibility }: HeaderProps) => {
    const [theme] = useContext(ThemeContext);

    return (
        <Navbar className={`header ${theme == 'dark' && 'bg-dark'}`}>
            <Navbar.Brand className={`${theme == 'dark' ? 'bg-dark text-light' : ''}`}>
                    <h2>WiseSpent</h2>
                </Navbar.Brand>

                <Nav className="d-flex align-items-center">
                    <Nav.Item>
                        <ToggleThemeSwitch />
                    </Nav.Item>
                    <Nav.Item>
                        <Dropdown drop="start">
                            <Dropdown.Toggle variant="" className={`fs-2 d-flex align-items-center border-0 ${theme === 'dark' && 'text-light'}`}>
                                <FaUserCircle />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={togglePersonalDataModalVisibility}>Dados pessoais</Dropdown.Item>
                                <Dropdown.Item className="text-danger" onClick={toggleLogoutModalVisibility}>Sair</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav.Item>
                </Nav>
        </Navbar>
    );
}

export default Header;