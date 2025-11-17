import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import LogoImage from "../assets/logo.png";
import "../index.css";
import "../styles/header-style.css";

const AdminLayout = () => {
  return (
    <div className="admin__container">
      <div className="header__wrapper">
        <header>
          <div className="logo__wrapper">
            <img src={LogoImage} alt="logo image" />
          </div>
        </header>
      </div>
      <div className="admin__wrapper"></div>

      <main>
        <div className="main__wrapper">
          <Sidebar />
          <div className="outlet__wrapper">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
