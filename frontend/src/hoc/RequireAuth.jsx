import { useLocation, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { isTokenValid } from "../functions/tokenValidation.js";
import React from "react";
import { Spinner } from "@material-tailwind/react";

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { token, loading } = useStateContext();
    const tokenValid = isTokenValid(token);

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

    if (!token || !tokenValid) {
        return <Navigate to="/access-denied" state={{ from: location }} />;
    }

    return children;
};

export { RequireAuth };
