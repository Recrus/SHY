import React from "react";
import { Outlet } from "react-router-dom";

function Teacher() {
    return (
        <div className="dark:text-primary">
            <Outlet />
        </div>
    );
}

export default Teacher;
