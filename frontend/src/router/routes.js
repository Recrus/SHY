import Login from "../components/Login/Login";
import Navbar from "../components/Navbar/Navbar";

export const privateRoutes = [{ id: 1, path: "/nav", element: <Navbar /> }];

export const publicRoutes = [{ id: 1, path: "/login", element: <Login /> }];
