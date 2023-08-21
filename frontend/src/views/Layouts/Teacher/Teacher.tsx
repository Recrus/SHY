import React from "react";
import { Outlet } from "react-router-dom";

function Teacher() {
    return (
        <div className="text-theme">
            <Outlet />
        </div>
    );
}

export default Teacher;
