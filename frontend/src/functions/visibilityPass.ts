import classes from "../views/Layouts/Login/Login.module.css";
import React from "react";

export const visibilityHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    const input = target.previousSibling as HTMLInputElement;

    if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
        target.classList.add(classes.visible);
        target.classList.remove(classes.notVisible);
    } else {
        input.setAttribute("type", "password");
        target.classList.add(classes.notVisible);
        target.classList.remove(classes.visible);
    }
};
