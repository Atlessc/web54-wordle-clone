import { Link } from 'react-router-dom';
import './NavBar.css'; 
// Make sure to create this CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/home" className="nav-link">Home</Link>
      <Link to="/daily-challenge" className="nav-link">Daily Challenge</Link>
      <Link to="/custom-challenge" className="nav-link">Custom Challenge</Link>
    </nav>
  );
};

export default NavBar;
