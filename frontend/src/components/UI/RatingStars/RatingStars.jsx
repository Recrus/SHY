import React from 'react';
import classes from "./RatingStars.module.css";

const MAX_STARS = 5;
const RatingStars = ({rating}) => {
    const filledStars = Math.round(rating * MAX_STARS);
    const emptyStars = MAX_STARS - filledStars;

    const filledStarElements = Array.from({length: filledStars}, (_, i) => (
        <span key={`filled-${i}`} className={classes.starColour}>&#9733;</span>
    ));

    const emptyStarElements = Array.from({length: emptyStars}, (_, i) => (
        <span key={`empty-${i}`} className={classes.starColour}>&#9734;</span>
    ));

    return (
        <div>
            {filledStarElements}
            {emptyStarElements}
        </div>
    );
};

export default RatingStars;
