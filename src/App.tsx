import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { supabase } from "./supabase";
import { userAtom } from "./store/auth";
import { useAtom } from "jotai";
import { useEffect } from "react";
import DefaultLayout from "./layout/default-layout";
import { DEFAULT_LAYOUT_ROUTES } from "./routes/default-layout";

const App: React.FC = () => {
  const [, setUser] = useAtom(userAtom);

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
          <Route element={<DefaultLayout />}>{DEFAULT_LAYOUT_ROUTES}</Route>
          <Route path="/" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};
App.displayName = "App Component";
export default App;
