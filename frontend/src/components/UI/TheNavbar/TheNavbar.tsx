import React from "react";
import {
    Navbar,
    Typography,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import logo from "../../../media/icons/logo-no-background.png";
import ProfileMenu from "../../../views/Layouts/ProfileMenu/ProfileMenu";
import { NavLink } from "react-router-dom";
import { TheNavbarProps } from "../../../../types/types";

const TheNavbar: React.FC<TheNavbarProps> = ({ listItems }) => {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const items = listItems.map(({ item, route }, index) => {
        return (
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-primary font-medium text-lg text-theme mb-4 lg:text-base lg:mb-0"
                key={index}
            >
                <NavLink
                    to={route}
                    className={({ isActive }) =>
                        `hover:text-primary transition-all ${
                            isActive ? "text-primary" : ""
                        }`
                    }
                    onClick={() => setOpenNav(false)}
                >
                    {item}
                </NavLink>
            </Typography>
        );
    });

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 xs:items-center">
            {items}
        </ul>
    );

    return (
        <>
            <Navbar className="fixed top z-10 h-max d-flex sm:max-w-[1440px] border-none rounded-none py-2 px-4 lg:px-8 lg:py-4 dark:bg-dark-accent transition-all">
                <div className="flex items-center justify-between text-gray">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        <img
                            src={logo}
                            alt="#"
                            className="h-[50px] lg:h-[70px]"
                        />
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <ProfileMenu />
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="orangered"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="orangered"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <ProfileMenu />
                </Collapse>
            </Navbar>
        </>
    );
};

export default TheNavbar;
