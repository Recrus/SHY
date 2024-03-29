import React, { FC } from "react";
import classes from "./Header.module.css";
import classesToButton from "../TheButton/Button.module.css";
import logo from "../../../media/images/Landing/logo.png";
import { Link } from "react-router-dom";

export interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    linkVisible: boolean;
}

const Header: FC<HeaderProps> = ({
    isMenuOpen,
    setIsMenuOpen,
    linkVisible,
}) => {
    const isMobile = window.screen.width > 768;
    let hideLinks = {};
    let burgerVisible = {};

    if (linkVisible) {
        hideLinks = {
            display: isMobile ? "block" : "none",
        };
        burgerVisible = {
            display: !isMobile ? "block" : "none",
        };
    } else {
        hideLinks = {
            display: "none",
        };
        burgerVisible = {
            display: "block",
        };
    }

    return (
        <>
            <header className={classes.navContainer}>
                <nav className={classes.nav}>
                    <img src={logo} alt="#" className={classes.logo} />
                    <div className={classes.navList}>
                        <div className={classes.link}>Home</div>
                        <hr className={classes.line} />
                        <div className={classes.link}>Products</div>
                        <hr className={classes.line} />
                        <div className={classes.link}>Contact</div>
                    </div>
                    <div className={classes.usersPaths}>
                        <Link
                            to="/login"
                            className={classes.loginLink}
                            style={hideLinks}
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className={classesToButton.button}
                            style={hideLinks}
                        >
                            Join Us
                        </Link>
                        <div
                            className={
                                isMenuOpen
                                    ? `${classes.burger} ${classes.open}`
                                    : `${classes.burger}`
                            }
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={burgerVisible}
                        >
                            <span />
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
