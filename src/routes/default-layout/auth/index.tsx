import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthorizedGuard from "@/components/route-guards/auth/is-authorized";
import { AUTH_PATHS } from "./index.enum";
import Loader from "@/components/ui/loading";

const RegisterLazy = lazy(() => import("@/pages/auth/register/register"));
const EmailConfirmationLazy = lazy(
  () => import("@/pages/auth/register/confirm-register"),
);
const LogInLazy = lazy(() => import("@/pages/auth/sign-in/sign-in"));
export const AUTH_ROUTES = [
  <>
    <Route
      path={AUTH_PATHS.FOR_REGISTER}
      element={
        <AuthorizedGuard>
          <Suspense fallback={<Loader />}>
            <RegisterLazy />
          </Suspense>
        </AuthorizedGuard>
      }
    />
    <Route
      path={AUTH_PATHS.FOR_CONFIRM_EMAIL}
      element={
        <Suspense fallback={<Loader />}>
          <EmailConfirmationLazy />
        </Suspense>
      }
    />
    <Route
      path={AUTH_PATHS.FOR_LOGIN}
      element={
        <AuthorizedGuard>
          <Suspense fallback={<Loader />}>
            <LogInLazy />
          </Suspense>
        </AuthorizedGuard>
      }
    />
  </>,
];
