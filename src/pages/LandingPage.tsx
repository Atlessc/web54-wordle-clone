import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Wordle Clone</h1>
      <p>Get ready to challenge your vocabulary!</p>
      <Link to="/daily-challenge"><button>Daily Challenge</button></Link>
    </div>
  );
};

export default LandingPage;
