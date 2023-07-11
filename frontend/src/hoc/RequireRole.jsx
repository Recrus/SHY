import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { Spinner } from "@material-tailwind/react";

const RequireRole = ({ role, children }) => {
    const location = useLocation();
    const { user, loading } = useStateContext();

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

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (user.role_id !== parseInt(role)) {
        console.log(parseInt(role));
        console.log("role problem");
        return (
            <Navigate to="/access-denied" replace state={{ from: location }} />
        );
    }

    return children;
};

export default RequireRole;
