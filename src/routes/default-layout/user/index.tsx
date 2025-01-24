import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import UnauthorizedGuard from "@/components/route-guards/auth/is-unauthorized";
import { USER_PATHS } from "./index.enum";

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
          <Suspense fallback={<span>Loading</span>}>
            <ProfileViewLazy />
          </Suspense>
        </UnauthorizedGuard>
      }
    />
    <Route
      path={USER_PATHS.FOR_CREATE}
      element={
        <UnauthorizedGuard>
          <Suspense fallback={<span>Loading</span>}>
            <CreatePostViewLazy />
          </Suspense>
        </UnauthorizedGuard>
      }
    />
    <Route
      path={USER_PATHS.FOR_FEED}
      element={
        <Suspense fallback={<span>Loading</span>}>
          <FeedViewLazy />
        </Suspense>
      }
    />
    <Route
      path={USER_PATHS.FOR_POST}
      element={
        <Suspense fallback={<span>Loading</span>}>
          <PostByIdViewLazy />
        </Suspense>
      }
    />
  </>,
];
