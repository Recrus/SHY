import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Spinner } from "@material-tailwind/react";

const LoggedUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { user, loading } = useStateContext();

    useEffect(() => {
        if (!loading && user) {
            if (user.role_id === 1) {
                navigate("/super-admin/home");
            } else if (user.role_id === 2) {
                //todo change to hr
                navigate("/hr");
            } else {
                //todo paths for reviewer and admin and else for no one
                navigate("/employee");
            }
        }
    }, [loading, user, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[100vh] bg-dark-neutral">
                <Spinner
                    color="light-blue"
                    className="h-20 w-20 text-dark-primary"
                />
            </div>
        );
    }

    return user ? null : children;
};

export { LoggedUser };
