import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../contexts/userContext";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(userContext);

  return isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />;
};
