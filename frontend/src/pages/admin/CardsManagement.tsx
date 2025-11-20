import "../../styles/cardmanagement-style.css";
import { GoDotFill } from "react-icons/go";

const CardsManagement = () => {
  const statusFilter: string[] = ["All cards", "Actives", "Maintance", "Used"];

  return (
    <div className="card_management__container">
      <header>
        <h1>RFID Card Management</h1>
        <div className="filter__wrapper">
          <span>Filter:</span>
          <select name="" id="option-status">
            {statusFilter.map((status: string) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </header>
      <table className="table_content">
        <thead>
          <tr>
            <th>Card UID</th>
            <th>
              <GoDotFill size={12} /> Status
            </th>
            <th>Last used</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>B3:48:17:40</td>
            <td>
              <GoDotFill size={12} /> Active
            </td>
            <td>11/15/2025 - 10:12 PM</td>
            <td>
              <button>Delete</button>
              <button>Maintenance</button>
            </td>
          </tr>
          <tr>
            <td>B3:48:17:40</td>
            <td>
              <GoDotFill size={12} /> Maintenance
            </td>
            <td>11/15/2025 - 10:12 PM</td>
            <td>
              <button>Delete</button>
              <button>Maintenance</button>
            </td>
          </tr>
          <tr>
            <td>B3:48:17:40</td>
            <td>
              <GoDotFill size={12} /> Used
            </td>
            <td>11/15/2025 - 10:12 PM</td>
            <td>
              <button>Delete</button>
              <button>Maintenance</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CardsManagement;
