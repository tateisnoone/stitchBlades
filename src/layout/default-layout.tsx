import { Outlet } from "react-router-dom";
import { Footer } from "./footer/footer";
import Header from "./header/header";
import { Toaster } from "@/components/ui/sonner";

const DefaultLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
