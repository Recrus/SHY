import classes from "../views/Layouts/Login/Login.module.css";

export const visibilityHandler = (e) => {
  e.preventDefault();
  if (e.target.previousSibling.getAttribute("type") === "password") {
    e.target.classList.add(`${classes.visible}`);
    e.target.classList.remove(`${classes.notVisible}`);
    e.target.previousSibling.setAttribute("type", "text");
  } else {
    e.target.classList.add(`${classes.notVisible}`);
    e.target.classList.remove(`${classes.visible}`);
    e.target.previousSibling.setAttribute("type", "password");
  }
};
