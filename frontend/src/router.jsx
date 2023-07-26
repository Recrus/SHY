import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./views/Layouts/DefaultLayout.jsx";
import GuestLayout from "./views/Layouts/GuestLayout.jsx";
import NoContent from "./views/Errors/NoContent.jsx";
import Login from "./views/Layouts/Login/Login.jsx";
import Landing from "./views/Layouts/Landing/Landing.jsx";
import SignUp from "./views/Layouts/SignUp/SignUp.jsx";
import Student from "./views/Layouts/Student/Student.jsx";
import Teacher from "./views/Layouts/Teacher/Teacher.jsx";
import SuperAdmin from "./views/Layouts/SuperAdmin/SuperAdmin.jsx";
import { RequireAuth } from "./hoc/RequireAuth.jsx";
import AccessDenied from "./views/Errors/AccessDenied.jsx";
import RequireRole from "./hoc/RequireRole.jsx";
import { LoggedUser } from "./hoc/LoggedUser.jsx";
import SignOut from "./views/Errors/SignOut.jsx";
import UserProfile from "./views/Layouts/UserProfile/UserProfile.jsx";
import Exams from "./views/Layouts/Exams/Exams.jsx";
import Home from "./views/Layouts/Home/Home.jsx";
import Users from "./views/Layouts/Users/Users.jsx";
import Test from "./views/Test.jsx";

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
                path: "/super-admin",
                element: (
                    <RequireRole role="1">
                        <SuperAdmin />
                    </RequireRole>
                ),
                children: [
                    {
                        path: "home",
                        element: <Test />,
                    },
                    {
                        path: "users",
                        element: <Users />,
                    },
                    {
                        path: "profile",
                        element: <UserProfile />,
                    },
                    {
                        path: "inbox",
                        element: <UserProfile />,
                    },
                    {
                        path: "exams",
                        element: <Exams />,
                    },
                ],
            },
            {
                path: "/hr",
                element: (
                    <RequireRole role="2">
                        <Teacher />
                    </RequireRole>
                ),
                children: [
                    {
                        path: "profile",
                        element: <UserProfile />,
                    },
                    {
                        path: "inbox",
                        element: <UserProfile />,
                    },
                ],
            },
            {
                path: "/employee",
                element: (
                    <RequireRole role="3">
                        <Student />
                    </RequireRole>
                ),
                children: [
                    {
                        path: "profile",
                        element: <UserProfile />,
                    },
                    {
                        path: "inbox",
                        element: <UserProfile />,
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
        path: "/sign-out",
        element: <SignOut />,
    },
    {
        path: "*",
        element: <NoContent />,
    },
]);

export default router;
