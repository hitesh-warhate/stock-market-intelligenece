import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from '../pages/Dashboard';
import Models from '../pages/Models';
import Research from '../pages/Research';
import { checkApiHealth, getStocks } from '../services/api';

const MainLayout = () => {
  const [apiConnected, setApiConnected] = useState(true);
  const [stocks, setAvailableStocks] = useState(['INFY', 'TCS', 'RELIANCE', 'HDFCBANK', 'ICICIBANK']);
  
  const getInitialTicker = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('ticker') || 'INFY';
  };
  
  const [selectedTicker, setSelectedTicker] = useState(getInitialTicker());

  useEffect(() => {
    const initApp = async () => {
      const isHealthy = await checkApiHealth();
      setApiConnected(isHealthy);
      const fetchedStocks = await getStocks();
      setAvailableStocks(fetchedStocks);
    };
    initApp();
  }, []);

  const handleSelectStock = (ticker) => {
    setSelectedTicker(ticker);
    const url = new URL(window.location.href);
    url.searchParams.set('ticker', ticker);
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        apiConnected={apiConnected} 
        stocks={stocks} 
        selectedTicker={selectedTicker} 
        onSelectStock={handleSelectStock} 
      />
      <div className="flex-1 w-full max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<Dashboard selectedTicker={selectedTicker} />} />
          <Route path="/models" element={<Models selectedTicker={selectedTicker} />} />
          <Route path="/research" element={<Research selectedTicker={selectedTicker} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
