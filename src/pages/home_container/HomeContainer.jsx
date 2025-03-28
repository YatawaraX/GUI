import React, { useState, useEffect } from 'react';
import './HomeContainer.css';

// List of Sri Lankan districts (moved outside the component to avoid recreation on every render)
const districts = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya"
];

const HomeContainer = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [currentDistrict, setCurrentDistrict] = useState(''); // For the dynamic message
  const [isDarkMode, setIsDarkMode] = useState(true); // State for theme toggle

  // Dynamic effect to change the district in the message
  useEffect(() => {
    let index = 0; // Start from the first district
    const interval = setInterval(() => {
      setCurrentDistrict(districts[index]); // Update the current district
      index = (index + 1) % districts.length; // Increment index and loop back to 0 when it reaches the end
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []); // Empty dependency array ensures this runs only once

  const handleSearch = () => {
    console.log(`From: ${from}, To: ${to}, Departure Date: ${departureDate}`);
  };

  const handleReset = () => {
    setFrom('');
    setTo('');
    setDepartureDate('');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  };

  return (
    <div className="home-container">
      {/* Theme Toggle Button */}
      <div className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? (
          <i className="fa fa-moon-o" aria-hidden="true"></i> // Moon icon for dark mode
        ) : (
          <i className="fa fa-sun-o" aria-hidden="true"></i> // Sun icon for light mode
        )}
      </div>

      <div className="search-header">
        <p>Search Through Over 7,500 Cities & Villages in Sri Lanka</p>
      </div>
      <div className="search-box">
        {/* From Dropdown */}
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="search-input"
        >
          <option value="" disabled>From</option>
          {districts
            .filter((district) => district !== to) // Exclude the selected "To" district
            .map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
        </select>

        {/* To Dropdown */}
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="search-input"
        >
          <option value="" disabled>To</option>
          {districts
            .filter((district) => district !== from) // Exclude the selected "From" district
            .map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
        </select>

        {/* Date Input */}
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="search-input"
        />

        {/* Search Button */}
        <button onClick={handleSearch} className="search-button">
          <i className="fa fa-search"></i> Search
        </button>

        {/* Reset Button */}
        <button onClick={handleReset} className="reset-button">
          <i className="fa fa-refresh"></i> Reset
        </button>
      </div>

      {/* Dynamic Message */}
      <div className="dynamic-message">
        <p>Let's travel to <span>{currentDistrict}</span></p>
      </div>
    </div>
  );
};

export default HomeContainer;