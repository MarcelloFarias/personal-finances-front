import { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import ToggleThemeSwitch from "../ToggleThemeSwitch/toggleThemeSwitch";
import { ThemeContext } from "../../contexts/themeContext";

const UnloggedHeader = () => {
    const [theme] = useContext(ThemeContext);

    return (
        <Navbar className={`header ${theme == 'dark' ? 'bg-dark' : ''}`}>
            <Navbar.Brand className={`${theme == 'dark' ? 'bg-dark text-light' : ''}`}>
                <h2>WiseSpent</h2>
            </Navbar.Brand>

            <Nav className="d-flex align-items-center">
                <Nav.Item>
                    <ToggleThemeSwitch />
                </Nav.Item>
            </Nav>
        </Navbar>
    );
}

export default UnloggedHeader;