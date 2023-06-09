// eslint-disable-next-line no-unused-vars
import React from 'react';
import classes from "../../UI/InfoCard/InfoCard.module.css";

const InfoCard = (props) => {
  let containerClass;
  if (props.containerClass) {
    containerClass = `${classes.infoCard_container} ${
      classes[props.containerClass]
    }`;
  } else {
    containerClass = classes.infoCard_container;
  }

  return (
    <div className={containerClass}>
      <div className={classes.infoImg_container}>
        <img className={classes[props.imgClass]} src={props.imgSrc} alt="#" />
      </div>
      <div className={classes.line}></div>
      <div className={classes.infoCard_body_container}>
        <div className={classes.infoCard_body}>
          <div className={classes.infoCard_body_title}>{props.title}</div>
          <div className={classes.infoCard_body_count}>{props.count}</div>
          <div className={classes.infoCard_body_stats}>{props.stats}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
