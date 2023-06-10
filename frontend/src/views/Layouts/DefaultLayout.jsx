import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

function DefaultLayout() {
    const {user, token} = useStateContext();

    if (!token) {
        return <Navigate to="/landing" />
    }

    return (
        <>
            <Outlet/>
        </>
    );
}

export default DefaultLayout;
