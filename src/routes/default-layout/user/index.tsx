import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import UnauthorizedGuard from "@/components/route-guards/auth/is-unauthorized";
import { USER_PATHS } from "./index.enum";
import Loader from "@/components/ui/loading";

const ProfileViewLazy = lazy(
  () => import("@/pages/profile/views/profile-view"),
);
const CreatePostViewLazy = lazy(
  () => import("@/pages/create-post/views/create-post.view"),
);
const FeedViewLazy = lazy(() => import("@/pages/feed/views/feed-view"));
const PostByIdViewLazy = lazy(
  () => import("@/pages/post-by-id/views/post-by-id-view"),
);
export const USER_ROUTES = [
  <>
    <Route
      path={USER_PATHS.FOR_PROFILE}
      element={
        <UnauthorizedGuard>
          <Suspense fallback={<Loader />}>
            <ProfileViewLazy />
          </Suspense>
        </UnauthorizedGuard>
      }
    />
    <Route
      path={USER_PATHS.FOR_CREATE}
      element={
        <UnauthorizedGuard>
          <Suspense fallback={<Loader />}>
            <CreatePostViewLazy />
          </Suspense>
        </UnauthorizedGuard>
      }
    />
    <Route
      path={USER_PATHS.FOR_FEED}
      element={
        <Suspense fallback={<Loader />}>
          <FeedViewLazy />
        </Suspense>
      }
    />
    <Route
      path={USER_PATHS.FOR_POST}
      element={
        <Suspense fallback={<Loader />}>
          <PostByIdViewLazy />
        </Suspense>
      }
    />
  </>,
];
