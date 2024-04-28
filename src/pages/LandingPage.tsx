import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Word In A Bottle!</h1>
      <p>Get ready to challenge your vocabulary!</p>
      <Link to="/daily-challenge"><button>Regular Mode</button></Link>
      <button>Coming Soon: Hard Mode</button>
      <button>Coming Soon: Insane Mode</button>
    </div>
  );
};

export default LandingPage;
