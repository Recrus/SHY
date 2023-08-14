import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";
import TheNavbar from "../../components/UI/TheNavbar/TheNavbar.jsx";
import DarkModeSwitcher from "../../components/UI/DarkModeSwitcher/DarkModeSwitcher.jsx";
import Footer from "../../components/UI/Footer/Footer.jsx";

const DefaultLayout = () => {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    let listItems = [];

    if (user.role_id === 1) {
        listItems = [
            {
                item: "Home",
                route: "/super-admin/home",
            },
            {
                item: "Users",
                route: "/super-admin/users",
            },
            {
                item: "Exams",
                route: "/super-admin/exams",
            },
            {
                item: "Tests",
                route: "/super-admin/tests",
            },
            {
                item: "Vacancies",
                route: "/super-admin/vacancies",
            },
        ];
    } else if (user.role_id === 2) {
        listItems = [
            {
                item: "Home",
                route: "/hr",
            },
            {
                item: "Vacancies",
                route: "/hr/vacancies",
            },
            {
                item: "Responses",
                route: "/hr/responses",
            },
        ];
    } else if (user.role_id === 3) {
        listItems = [
            {
                item: "Home",
                route: "/employee",
            },
            {
                item: "Exams",
                route: "/employee/exams",
            },
            {
                item: "Tests",
                route: "/employee/tests",
            },
            {
                item: "Vacancies",
                route: "/employee/vacancies",
            },
        ];
    }

    return (
        <div className="dark:bg-dark-primary transition-all">
            <div className="mx-auto xl:max-w-[1440px]">
                <div className="flex justify-center">
                    <TheNavbar listItems={listItems} />
                </div>
                <div className="pt-[90px] px-2 lg:pt-[120px] lg:px-4 pb-[90px]">
                    <Outlet />
                </div>
                <div className="fixed bottom-14 right-6 max-w-[35px]">
                    <DarkModeSwitcher sunColor="goldenrod" />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default DefaultLayout;
