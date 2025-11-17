import { NavLink } from "react-router-dom";
import "../styles/header-style.css";

const Sidebar = () => {
  return (
    <ul className="sidebar">
      <li>
        <NavLink to="dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="cards-management">RFID Card Management</NavLink>
      </li>
      <li>
        <NavLink to="sessions-management">Parking Session Management</NavLink>
      </li>
      <li>
        <NavLink to="payments">Payments</NavLink>
      </li>
    </ul>
  );
};

export default Sidebar;
