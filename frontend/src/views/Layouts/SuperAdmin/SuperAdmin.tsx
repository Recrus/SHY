import React from "react";
import { Outlet } from "react-router-dom";

const SuperAdmin = () => {
    return (
        <div className="text-theme">
            <Outlet />
        </div>
    );
};

export default SuperAdmin;
