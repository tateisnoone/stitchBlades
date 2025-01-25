import { AUTH_PATHS } from "@/routes/default-layout/auth/index.enum";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const UnauthorizedGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = localStorage.getItem("userSession");

  if (!user) {
    return <Navigate to={AUTH_PATHS.FOR_LOGIN} />;
  }
  return children || <Outlet />;
};

export default UnauthorizedGuard;
