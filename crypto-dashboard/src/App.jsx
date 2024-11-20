import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;

