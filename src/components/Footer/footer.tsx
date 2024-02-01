import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import "./style.scss";

const Footer = () => {
    const [theme] = useContext(ThemeContext);

    return (
        <footer>
            <p className={`${theme === 'dark' && 'text-light'}`}>Copyright WiseSpent © Designed with ❤️ by Marcello Farias</p>
        </footer>
    );
}

export default Footer;