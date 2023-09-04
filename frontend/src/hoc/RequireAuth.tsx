import React, { FC } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import { isTokenValid } from "../functions/tokenValidation";
import { Spinner } from "@material-tailwind/react";

const RequireAuth: FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const { token, loading } = useStateContext();
    const tokenValid = isTokenValid(token);

    if (loading) {
        return (
            <div className="flex-center items-center h-[100vh] bg-dark-neutral">
                <Spinner
                    color="light-blue"
                    className="h-20 w-20 text-dark-primary"
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
