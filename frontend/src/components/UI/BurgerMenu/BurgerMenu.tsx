import React, { FC } from "react";
import classes from "./BurgerMenu.module.css";
import facebook from "../../../media/icons/Login/facebook.svg";
import instagram from "../../../media/icons/Login/instagram.svg";
import twitter from "../../../media/icons/Login/twitter.svg";
import { Link } from "react-router-dom";
import TheButton from "../TheButton/TheButton";
import { BurgerMenuProps } from "../../../../types/types";

const BurgerMenu: FC<BurgerMenuProps> = ({ isOpen, setIsOpen }) => {
    return (
        <div
            className={
                isOpen ? `${classes.menu} ${classes.active}` : `${classes.menu}`
            }
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className={classes.blur} />
            <div
                className={classes.menu_content}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={classes.navList}>
                    <div className={classes.navList_items}>
                        <div className={classes.link}>Home</div>
                        <hr className={classes.line} />
                        <div className={classes.link}>Products</div>
                        <hr className={classes.line} />
                        <div className={classes.link}>Contact</div>
                        <hr className={classes.line} />
                    </div>
                    <Link to="/login" className={classes.loginLink}>
                        Login
                    </Link>
                    <TheButton text={"Join us"}></TheButton>
                    <div className={classes.footer_links}>
                        <a href="#">
                            <img src={facebook} alt="#" />
                        </a>
                        <a href="#">
                            <img src={instagram} alt="#" />
                        </a>
                        <a href="#">
                            <img src={twitter} alt="#" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BurgerMenu;
