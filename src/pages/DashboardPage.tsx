import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/daily-challenge"><button>Daily Challenge</button></Link>
    </div>
  );
};

export default DashboardPage;
