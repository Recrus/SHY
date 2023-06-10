import React from 'react';
import classes from "./Button.module.css";

const Button = ({text, isHide}) => {
  return <button className={classes.button} style={isHide}>{text}</button>;
};

export default Button;
