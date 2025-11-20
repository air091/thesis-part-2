import "../../styles/sessionmanagement-style.css";
import "../../styles/cardmanagement-style.css";

const SessionsManagement = () => {
  const sessionsFilter: string[] = ["All sessions", "Actice", "Completed"];
  const datesFilter: string[] = ["Today", "Weekly", "Monthly"];

  return (
    <div className="session__container">
      <header>
        <h1>Parking Sessions Management</h1>
        <div>
          <span>Filter</span>
          <select name="session-filter" id="session-options">
            {sessionsFilter.map((session: string) => (
              <option key={session} value={session}>
                {session}
              </option>
            ))}
          </select>
          <select name="date-filter" id="date-options">
            {datesFilter.map((date: string) => (
              <option key={date} value={date}>
                {date}
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
            <th>Time in</th>
            <th>Time out</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>B3:48:17:40</td>
            <td>11/15/2025 - 10:12 PM</td>
            <td>N/A</td>
            <td>P30.00</td>
            <td>Active</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>B3:48:17:41</td>
            <td>11/15/2025 - 10:12 PM</td>
            <td>11/15/2025 - 11:12 PM</td>
            <td>P30.00</td>
            <td>Completed</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>B3:48:17:42</td>
            <td>11/15/2025 - 10:12 PM</td>
            <td>11/15/2025 - 10:12 PM</td>
            <td>P30.00</td>
            <td>Completed</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SessionsManagement;
