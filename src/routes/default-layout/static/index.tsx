import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { STATIC_PATHS } from "./index.enum";

const HomeViewLazy = lazy(() => import("@/pages/home/views/home-view"));
const AboutViewLazy = lazy(() => import("@/pages/about-us/views/about-view"));
const NotFoundPage = lazy(() => import("@/pages/not-found/not-found"));

export const STATIC_ROUTES = [
  <>
    <Route
      path={STATIC_PATHS.FOR_HOME}
      element={
        <Suspense fallback={<span>Loading</span>}>
          <HomeViewLazy />
        </Suspense>
      }
    />
    <Route
      path={STATIC_PATHS.FOR_ABOUT}
      element={
        <Suspense fallback={<span>Loading</span>}>
          <AboutViewLazy />
        </Suspense>
      }
    />
    <Route
      path={STATIC_PATHS.FOR_NOT_FOUND}
      element={
        <Suspense fallback={<span>Loading</span>}>
          <NotFoundPage />
        </Suspense>
      }
    />
  </>,
];
