import "../../styles/dashboard-style.css";

const Dashboard = () => {
  return (
    <div className="dashboard__container">
      <header>
        <h1>Dashboard</h1>
      </header>
      <div className="row_2">
        <DashboardCard
          parkingProp={{
            name: "Parking Sessions",
            value: 10,
            assumedDate: "Completed today",
            backgroundColor: "#F0F0F0",
            textColor: "#303030",
          }}
        />
        <DashboardCard
          RFProp={{
            name: "Card Available",
            value: 10,
            backgroundColor: "#F0F0F0",
            textColor: "#303030",
            estimatedValue: 98,
          }}
        />
        <DashboardCard
          revenueProp={{
            name: "Revenue",
            value: 100.0,
            backgroundColor: "#484848",
            textColor: "#F0F0F0",
            optionDates: ["today", "weekly", "monthly"],
            optionMethods: ["coin", "cash", "e-wallet"],
            valueColor: "#7DFF7D",
          }}
        />
      </div>
    </div>
  );
};

interface DashboardCardRFProps {
  name: string;
  value: number;
  backgroundColor?: string;
  textColor?: string;
  estimatedValue: number;
}

interface DashboardCardRevenueProps {
  name: string;
  value: number;
  backgroundColor?: string;
  textColor?: string;
  valueColor: string;
  optionDates: string[];
  optionMethods: string[];
}

interface DashboardCardParkingProps {
  name: string;
  value: number;
  assumedDate: string;
  backgroundColor?: string;
  textColor?: string;
}

interface DashboardCardProps {
  parkingProp?: DashboardCardParkingProps;
  revenueProp?: DashboardCardRevenueProps;
  RFProp?: DashboardCardRFProps;
}

const DashboardCard = ({
  parkingProp,
  revenueProp,
  RFProp,
}: DashboardCardProps) => {
  const bgColor =
    parkingProp?.backgroundColor ||
    RFProp?.backgroundColor ||
    revenueProp?.backgroundColor;

  const textColor =
    parkingProp?.textColor || RFProp?.textColor || revenueProp?.textColor;

  return (
    <div
      className="dashboard__card"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <header>
        {parkingProp && (
          <div>
            <span className="card_name">{parkingProp.name}</span>
            <span className="assumed__date">({parkingProp.assumedDate})</span>
          </div>
        )}
        {RFProp && <span className="card_name">{RFProp.name}</span>}
        {revenueProp && <span className="card_name">{revenueProp.name}</span>}

        {revenueProp?.optionDates && revenueProp?.optionMethods && (
          <div className={`option__selectors__wrapper `}>
            <select name="" id="option-dates">
              {revenueProp.optionDates.map((date: string) => (
                <option key={date} value={date} className={` option__selector`}>
                  {date}
                </option>
              ))}
            </select>
            <select name="" id="option-methods">
              {revenueProp.optionMethods.map((method: string) => (
                <option
                  key={method}
                  value={method}
                  className={` option__selector`}
                >
                  {method}
                </option>
              ))}
            </select>
          </div>
        )}
      </header>
      <div className="row_2">
        <div className="row_2__wrapper">
          {parkingProp && (
            <div>
              <span>{parkingProp.value}</span>
            </div>
          )}
          {RFProp && (
            <div>
              <span className="rf_values">{RFProp.value}</span>
              <span className="estimated_value">/{RFProp.estimatedValue}</span>
            </div>
          )}
          {revenueProp && (
            <div>
              <span className="currency">P</span>
              <span className="revenue_value">{revenueProp.value}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
