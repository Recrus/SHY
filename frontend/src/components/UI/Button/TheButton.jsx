import React from "react";
import classes from "./Button.module.css";

const TheButton = ({ text, isHide, className, handler, type, disabled }) => {
    return (
        <button
            className={`${classes.button} ${className}`}
            style={isHide}
            onClick={handler}
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default TheButton;
