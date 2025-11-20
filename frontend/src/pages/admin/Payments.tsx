import "../../styles/cardmanagement-style.css";
import "../../styles/payment-style.css";

const Payments = () => {
  const datesFilter: string[] = ["Today", "Weekly", "Monthly"];
  const methodsFilter: string[] = ["Coin", "Cash", "E-wallet"];
  return (
    <div className="payment__container">
      <header>
        <h1>Payments</h1>
        <div className="filter__wrapper">
          <span>Filter</span>
          <select name="dates" id="payment-date-options">
            {datesFilter.map((date: string) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          <select name="methos" id="method-options">
            {methodsFilter.map((method: string) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      </header>
      <table className="table_content">
        <thead>
          <tr>
            <th>Session ID</th>
            <th>Card UID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>B3:48:17:40</td>
            <td>P30.00</td>
            <td>Coin</td>
            <td>11/15/2025 - 10:12 PM</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>B3:48:17:41</td>
            <td>P30.00</td>
            <td>Coin</td>
            <td>11/15/2025 - 10:12 PM</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>B3:48:17:42</td>
            <td>P30.00</td>
            <td>Coin</td>
            <td>11/15/2025 - 10:12 PM</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
