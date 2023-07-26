import React from "react";
import { Link, Outlet } from "react-router-dom";

function Student() {
    return (
        <div className="dark:text-primary">
            <Outlet />
        </div>
    );
}

export default Student;
