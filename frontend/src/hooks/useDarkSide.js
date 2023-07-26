import { useState, useEffect } from "react";

export default function useDarkSide() {
    const userPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    const [theme, setTheme] = useState(userPreference ? "dark" : "light");

    useEffect(() => {
        const body = document.body;
        body.classList.remove(theme === "dark" ? "light" : "dark");
        body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme === "dark" ? "light" : "dark", setTheme];
}
