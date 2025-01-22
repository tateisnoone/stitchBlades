import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const UnauthorizedGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = localStorage.getItem("userSession");

  if (!user) {
    return <Navigate to="/register" />;
  }
  return children || <Outlet />;
};

export default UnauthorizedGuard;
