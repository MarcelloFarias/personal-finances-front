import { useContext, useEffect } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { CiLight, CiDark  } from "react-icons/ci";
import './style.scss';
import { Button } from "react-bootstrap";

const ToggleThemeSwitch = () => {
    const [theme, setTheme] = useContext(ThemeContext);

    const handleTheme = () => {
        if(theme === 'light') {
            setTheme('dark');
            document.body.classList.add("bg-dark");
        }
        else {
            setTheme('light');
            document.body.classList.remove("bg-dark");
        }
    }

    useEffect(() => {
        console.log(theme);
    }, [theme]);

    return (
        <Button 
            variant="" 
            onClick={handleTheme}
            id='button-theme'
            className={`fs-3 me-3 ${theme === 'light' ? '' : 'text-light'}`}
        >
            {theme === 'light' ? <CiDark/> : <CiLight/>}
        </Button>
    );
}

export default ToggleThemeSwitch;