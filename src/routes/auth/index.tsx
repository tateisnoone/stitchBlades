// import { lazy, Suspense } from "react";
// import { Route } from "react-router-dom";
// import { AUTH_PATHS } from "../index.enum";

// const BlogsLazy = lazy(() => import("@/pages/blogs/blogs"));
// const BlogCreateViewLazy = lazy(
//   () => import("@/pages/blogs/components/views/create"),
// );
// const BlogEditViewLazy = lazy(
//   () => import("@/pages/blogs/components/views/edit"),
// );

// export const AUTH_ROUTES = [
//   <>
//     <Route
//       index
//       element={
//         <Suspense fallback={<span>Loading</span>}>
//           <BlogsLazy />
//         </Suspense>
//       }
//     />
//     <Route
//       path={DASHBOARD_PATHS.FOR_CREATE}
//       element={
//         <Suspense fallback={<span>Loading</span>}>
//           <BlogCreateViewLazy />
//         </Suspense>
//       }
//     />
//     <Route
//       path={DASHBOARD_PATHS.FOR_EDIT}
//       element={
//         <Suspense fallback={<span>Loading</span>}>
//           <BlogEditViewLazy />
//         </Suspense>
//       }
//     />
//   </>,
// ];
