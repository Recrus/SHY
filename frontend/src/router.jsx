import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./views/Layouts/DefaultLayout.jsx";
import GuestLayout from "./views/Layouts/GuestLayout.jsx";
import NoContent from "./views/Errors/NoContent.jsx";
import Login from "./views/Layouts/Login/Login.jsx";
import Landing from "./views/Layouts/Landing/Landing.jsx";
import SignUp from "./views/Layouts/SignUp/SignUp.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                // todo edit
                element: <Navigate to='/landing'/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to='/landing'/>
            },
            {
                path: '/landing',
                element: <Landing/>,
            },
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/signup',
                element: <SignUp/>,
            },
        ]
    },
    {
        path: '*',
        element: <NoContent/>,
    },
])

export default router;
