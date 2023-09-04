import React, { useState, useEffect } from "react";
import { Theme } from "../../types/types";

export default function useDarkSide(): [
    Theme,
    React.Dispatch<React.SetStateAction<Theme>>,
] {
    const userPreference = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;
    const [theme, setTheme] = useState<Theme>(
        userPreference ? "dark" : "light",
    );

    useEffect(() => {
        const body = document.body;
        body.classList.remove(theme === "dark" ? "light" : "dark");
        body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme === "dark" ? "light" : "dark", setTheme];
}
