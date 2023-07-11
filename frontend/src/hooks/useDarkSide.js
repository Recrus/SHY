import { useState, useEffect } from "react";

export default function useDarkSide() {
    const userPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useState(userPreference ? 'dark' : 'light');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return [theme === 'dark' ? 'light' : 'dark', setTheme];
}
