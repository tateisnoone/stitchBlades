import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./layout/dashboard";
import { ThemeProvider } from "@/components/theme-provider";
// import { supabase } from "./supabase";
//import { useAuthContext } from "./context/auth/hooks/useAuthContext";
// import { userAtom } from "./store/auth";
// import { useAtom } from "jotai";
// import { DASHBOARD_ROUTES } from "./routes/dashboard";

const App: React.FC = () => {
  // const { handleSetUser } = useAuthContext();
  // const [, setUser] = useAtom(userAtom);
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
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/" element={<Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};
App.displayName = "App Component";
export default App;
