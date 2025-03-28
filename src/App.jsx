import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import About from './pages/about/About';
import Services from './pages/service/Service'; // Import the Services page
import Bus from './pages/bus/Bus'; // Import the Bus page
import HomeContainer from './pages/home_container/HomeContainer';
import './pages/home_container/HomeContainer.css';

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} /> {/* Add Services route */}
          <Route path="/bus" element={<Bus />} /> {/* Add Bus route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;