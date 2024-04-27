import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import DailyChallengePage from './pages/DailyChallengePage';
import CustomChallengePage from './pages/CustomChallengePage';
import NavBar from './components/GlobalComponents/NavBar/Navbar';
import './App.css';

function App() {
  return (
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/daily-challenge" element={<DailyChallengePage />} />
          <Route path="/custom-challenge" element={<CustomChallengePage />} />
        </Routes>
      </div>
  );
}

export default App;
