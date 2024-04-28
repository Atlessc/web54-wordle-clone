import { Link } from 'react-router-dom';
import './NavBar.css'; 
// Make sure to create this CSS file for styling

// TODO: update to allow for mobile view

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
      <Link to="/daily-challenge" className="nav-link">Random Word In A Bottle</Link>
      <Link to="/custom-challenge" className="nav-link">Custom Challenge</Link>
    </nav>
  );
};

export default NavBar;
