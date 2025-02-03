import { Link } from "react-router-dom";
import "../style/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Course Platform</h1>
      <p>Explore a variety of courses and enhance your knowledge.</p>
      <div className="buttons">
        <Link to="/courses" className="btn">View Courses</Link>
        <Link to="/register" className="btn btn-alt">Get Started</Link>
      </div>
    </div>
  );
};

export default Home;
