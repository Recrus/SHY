import React, { useState, FC } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../../hooks/useDarkSide";
import { DarkModeSwitcherProps } from "../../../../types/types";

const DarkModeSwitcher: FC<DarkModeSwitcherProps> = ({
    sunColor,
    moonColor,
}) => {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === "light");

    const toggleDarkMode = (checked: boolean) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <div>
            <DarkModeSwitch
                style={{ marginRight: "30px" }}
                checked={darkSide}
                onChange={toggleDarkMode}
                size={35}
                sunColor={sunColor}
                moonColor={moonColor}
            />
        </div>
    );
};

export default DarkModeSwitcher;
