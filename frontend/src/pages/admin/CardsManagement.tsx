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
      <table>
        <tr>
          <th>Card UID</th>
          <th>
            <GoDotFill /> Status
          </th>
          <th>Last used</th>
          <th>Actions</th>
        </tr>
      </table>
    </div>
  );
};

export default CardsManagement;
