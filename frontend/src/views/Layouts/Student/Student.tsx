import React from "react";
import { Outlet } from "react-router-dom";

function Student() {
    return (
        <div className="text-theme">
            <Outlet />
        </div>
    );
}

export default Student;
