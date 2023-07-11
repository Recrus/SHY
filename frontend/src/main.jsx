import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ContextProvider } from "./context/ContextProvider.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </ContextProvider>
    </React.StrictMode>
);
