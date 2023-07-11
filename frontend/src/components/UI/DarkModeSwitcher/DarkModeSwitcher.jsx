import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../../hooks/useDarkSide.js";

export default function DarkModeSwitcher(sunColor, moonColor) {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light"
    );

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <div>
            <DarkModeSwitch
                style={{ marginRight: '30px' }}
                checked={darkSide}
                onChange={toggleDarkMode}
                size={35}
                sunColor={sunColor}
            />
        </div>
    );
}
