import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/ThemeToggle.css';

function ThemeToggle() {
  // Access theme context to get current theme and toggle function
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      className={`theme-toggle ${theme}`} 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Show sun icon for light mode and moon icon for dark mode */}
      <span className="icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="label">
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </span>
    </button>
  );
}

export default ThemeToggle; 