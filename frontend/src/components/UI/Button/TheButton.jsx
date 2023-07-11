import React from 'react';
import classes from "./Button.module.css";

const TheButton = ({text, isHide}) => {
  return <button className={classes.button} style={isHide}>{text}</button>;
};

export default TheButton;
