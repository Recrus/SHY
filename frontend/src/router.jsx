import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./views/Layouts/DefaultLayout.jsx";
import GuestLayout from "./views/Layouts/GuestLayout.jsx";
import NoContent from "./views/Errors/NoContent.jsx";
import Login from "./views/Layouts/Login/Login.jsx";
import Landing from "./views/Layouts/Landing/Landing.jsx";
import SignUp from "./views/Layouts/SignUp/SignUp.jsx";
import Student from "./views/Layouts/Student/Student.jsx";
import Teacher from "./views/Layouts/Teacher/Teacher.jsx";
import Admin from "./views/Layouts/Admin/Admin.jsx";
import { RequireAuth } from "./hoc/RequireAuth.jsx";
import AccessDenied from "./views/Errors/AccessDenied.jsx";
import RequireRole from "./hoc/RequireRole.jsx";
import Test from "./views/Test.jsx";
import { LoggedUser } from "./hoc/LoggedUser.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <RequireAuth>
                <DefaultLayout />
            </RequireAuth>
        ),
        children: [
            {
                path: "/admin",
                element: (
                    <RequireRole role="1">
                        <Admin />
                    </RequireRole>
                ),
            },
            {
                path: "/teacher",
                element: (
                    <RequireRole role="2">
                        <Teacher />
                    </RequireRole>
                ),
            },
            {
                path: "/student",
                element: (
                    <RequireRole role="3">
                        <Student />
                    </RequireRole>
                ),
                children: [
                    {
                        path: "create",
                        // todo edit
                        element: <Test />,
                    },
                ],
            },
        ],
    },
    {
        path: "/",
        element: (
            <LoggedUser>
                <GuestLayout />
            </LoggedUser>
        ),
        children: [
            {
                path: "/landing",
                element: <Landing />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/",
                element: <Navigate to="/landing" />,
            },
        ],
    },
    {
        path: "/access-denied",
        element: <AccessDenied />,
    },
    {
        path: "*",
        element: <NoContent />,
    },
]);

export default router;
