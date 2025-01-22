import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Register from "./pages/auth/register/register";
import { supabase } from "./supabase";
import { userAtom } from "./store/auth";
import { useAtom } from "jotai";
import { useEffect } from "react";
import LogIn from "./pages/auth/sign-in/sign-in";
import ProfileView from "./pages/profile/views/profile-view";
import AuthorizedGuard from "./components/route-guards/auth/is-authorized";
import UnauthorizedGuard from "./components/route-guards/auth/is-unauthorized";
import CreatePostView from "./pages/create-post/views/create-post.view";
import HomeView from "./pages/home/views/home-view";
import NotFoundPage from "./pages/not-found/not-found";
import AboutView from "./pages/about-us/views/about-view";
import EmailConfirmationPage from "./pages/auth/register/confirm-register";
import FeedView from "./pages/feed/views/feed-view";
import DefaultLayout from "./layout/default-layout";
// import { DASHBOARD_ROUTES } from "./routes/dashboard";

const App: React.FC = () => {
  // const { handleSetUser } = useAuthContext();
  const [, setUser] = useAtom(userAtom);
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setUser(session);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setUser(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [setUser]);

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session);
        localStorage.setItem("userSession", JSON.stringify(session));
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
      if (session) {
        localStorage.setItem("userSession", JSON.stringify(session));
      } else {
        localStorage.removeItem("userSession");
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomeView />} />
            <Route
              path="register"
              element={
                <AuthorizedGuard>
                  <Register />
                </AuthorizedGuard>
              }
            />
            <Route path="registered" element={<EmailConfirmationPage />} />
            <Route
              path="login"
              element={
                <AuthorizedGuard>
                  <LogIn />
                </AuthorizedGuard>
              }
            />
            <Route
              path="profile"
              element={
                <UnauthorizedGuard>
                  <ProfileView />
                </UnauthorizedGuard>
              }
            />
            <Route
              path="create"
              element={
                <UnauthorizedGuard>
                  <CreatePostView />
                </UnauthorizedGuard>
              }
            />
            <Route path="feed" element={<FeedView />} />
            <Route path="about" element={<AboutView />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/" />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};
App.displayName = "App Component";
export default App;
