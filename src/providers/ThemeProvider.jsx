import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const themeInfo = { theme, toggleTheme };

    return (
        <ThemeContext.Provider value={themeInfo}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
