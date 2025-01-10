//import Header from "./header/header";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer/footer";
import Header from "./header/header";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
