import React, { FC } from "react";
import classes from "./RateCards.module.css";
import RatingStars from "../RatingStars/RatingStars";
import { Overview } from "../../../../types/types.js";
const RateCards: FC<{ overviews: Overview[] }> = ({ overviews }) => {
    return (
        <>
            {overviews.map((item, index) => (
                <div
                    key={index}
                    className={
                        classes.rateCard_wrapper +
                        " drop-shadow-md dark:bg-primary ease-in-out duration-300"
                    }
                >
                    <div className={classes.startCount}>
                        <RatingStars rating={1}></RatingStars>
                    </div>
                    <div className={classes.rateCard_text}>{item.content}</div>
                    <div className={classes.rateCard_person}>
                        <a href={item.git}>
                            <img
                                src={item.avatar}
                                alt="#"
                                className={classes.avatar}
                            />
                        </a>
                        <div className={classes.personInfo_container}>
                            <div className={classes.personInfo_name}>
                                {item.author}
                            </div>
                            <div className={classes.personInfo_occupation}>
                                {item.occupation}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default RateCards;
