import React from "react";
import {
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    ChevronDownIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
} from "@heroicons/react/24/outline";
import { useStateContext } from "../../../context/StateContext";
import axiosFetch from "../../../plugins/axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ProfileMenuItems } from "../../../../types/types";

const ProfileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();
    const closeMenu = () => setIsMenuOpen(false);
    const { user, token, setToken, setUser } = useStateContext();
    let route: string;

    if (user?.role_id === 1) {
        route = "super-admin";
    } else if (user?.role_id === 2) {
        route = "hr";
    } else {
        route = "student";
    }

    const profileMenuItems: ProfileMenuItems[] = [
        {
            label: "My Profile",
            icon: UserCircleIcon,
            route: `/${route}/profile`,
        },
        {
            label: "Inbox",
            icon: InboxArrowDownIcon,
            route: `/${route}/inbox`,
        },
        {
            label: "Help",
            icon: LifebuoyIcon,
            route: `/${route}/help`,
        },
        {
            label: "Sign Out",
            icon: PowerIcon,
            route: "",
        },
    ];

    const signOutHandler = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            navigate("/sign-out");
            await axiosFetch.post("/auth/logout", {
                token,
            });

            setToken(null);
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto hidden lg:flex"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        className="border border-indigo-500 p-0.5 w-16 h-16"
                        src="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette.png"
                    />
                    <div className="normal-case px-1 font-normal text-theme tracking-wide">
                        {user?.first_name}
                    </div>
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-5 w-5 transition-transform text-theme ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1 dark:bg-dark-neutral dark:border-dark-neutral">
                {profileMenuItems.map(({ label, icon, route }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded outline-0 dark:text-neutral dark:focus:bg-dark-additional duration-250 ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-6 w-6 ${
                                    isLastItem ? "text-amber-400" : ""
                                }`,
                                strokeWidth: 1,
                            })}
                            <NavLink
                                className={({ isActive }) =>
                                    `font-normal text-base w-full h-full ${
                                        isActive ? "text-primary" : ""
                                    }
                                    ${isLastItem ? "!text-amber-400" : ""}`
                                }
                                to={isLastItem ? "" : route}
                                onClick={isLastItem ? signOutHandler : () => {}}
                            >
                                {label}
                            </NavLink>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

export default ProfileMenu;
