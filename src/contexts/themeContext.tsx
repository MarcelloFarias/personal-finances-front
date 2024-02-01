import { createContext, useState } from "react";

const ThemeContext = createContext<any>(null);

const ThemeProvider = ({children}: any) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}

export {ThemeContext, ThemeProvider};