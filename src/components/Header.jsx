import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Space Mission Tracker</h1>
          <p>Explore the final frontier</p>
        </div>
        <div className="header-right">
          <nav className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/missions">Missions</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header; 