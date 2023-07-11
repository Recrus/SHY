import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Spinner } from "@material-tailwind/react";

const LoggedUser = ({ children }) => {
    const navigate = useNavigate();
    const { user, role, loading } = useStateContext();

    useEffect(() => {
        if (!loading && user) {
            if (role === 1) {
                navigate("/admin");
            } else if (role === 2) {
                navigate("/teacher");
            } else {
                navigate("/student");
            }
        }
    }, [loading, user, navigate, role]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[100vh]">
                <Spinner
                    color="light-blue"
                    className="h-20 w-20 text-gray-light"
                />
            </div>
        );
    }

    return user ? null : children;
};

export { LoggedUser };
