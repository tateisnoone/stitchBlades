import { userAtom } from "@/store/auth";
import { useAtom } from "jotai";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthorizedGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const [user] = useAtom(userAtom);
  if (user) {
    return <Navigate to="/" />;
  }
  return children || <Outlet />;
};

export default AuthorizedGuard;
