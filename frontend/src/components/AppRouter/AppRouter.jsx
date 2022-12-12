import React, { useContext } from "react";
import { AuthContext } from "../../context";
import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../router/routes";

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
      <Route path="/*" element={<Navigate to="/nav" replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
