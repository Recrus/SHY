import React from "react";
import { Outlet } from "react-router-dom";

const SuperAdmin = () => {
    return (
        <div className="dark:text-primary">
            <Outlet />
        </div>
    );
};

export default SuperAdmin;
