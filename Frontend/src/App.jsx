import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Agents from './pages/Agents';
import RiskManagement from './pages/RiskManagement';
import HedgeFund from './pages/HedgeFund';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/risk-management" element={<RiskManagement />} />
        <Route path="/hedge-fund" element={<HedgeFund />} />
      </Routes>
    </Router>
  );
}

export default App;
