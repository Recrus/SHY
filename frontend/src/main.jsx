import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {ContextProvider} from "./context/ContextProvider.jsx";
import {ThemeProvider} from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ContextProvider>
          <ThemeProvider>
              <RouterProvider router={router} />
          </ThemeProvider>
      </ContextProvider>
  </React.StrictMode>,
)
