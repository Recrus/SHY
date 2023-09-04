import React, { FC } from "react";
import classes from "./Button.module.css";
import { TheButtonProps } from "../../../../types/types";

const TheButton: FC<TheButtonProps> = ({
    text,
    className,
    handler,
    type,
    disabled,
}) => {
    return (
        <button
            className={`${classes.button} ${className}`}
            onClick={handler}
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default TheButton;
