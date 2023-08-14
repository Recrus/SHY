import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./views/Layouts/DefaultLayout";
import GuestLayout from "./views/Layouts/GuestLayout";
import NoContent from "./views/Errors/NoContent";
import Login from "./views/Layouts/Login/Login";
import Landing from "./views/Layouts/Landing/Landing";
import SignUp from "./views/Layouts/SignUp/SignUp";
import Student from "./views/Layouts/Student/Student";
import Teacher from "./views/Layouts/Teacher/Teacher";
import SuperAdmin from "./views/Layouts/SuperAdmin/SuperAdmin";
import { RequireAuth } from "./hoc/RequireAuth";
import AccessDenied from "./views/Errors/AccessDenied";
import RequireRole from "./hoc/RequireRole";
import { LoggedUser } from "./hoc/LoggedUser";
import SignOut from "./views/Errors/SignOut";
import UserProfile from "./views/Layouts/UserProfile/UserProfile";
import Exams from "./views/Layouts/Exams/Exams";
// import Home from "./views/Layouts/Home/Home";
import Users from "./views/Layouts/Users/Users";
import Test from "./views/Test";

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
                    <RequireRole role={1}>
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
                    <RequireRole role={2}>
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
                    <RequireRole role={3}>
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
        //todo change route for sign out action
        element: <SignOut />,
    },
    {
        path: "*",
        element: <NoContent />,
    },
]);

export default router;
