import React, { useState, useEffect } from 'react';
import RegimeTimeline from '../components/RegimeTimeline';
import ResearchConfig from '../components/ResearchConfig';
import { LoadingState, ErrorState } from '../components/States';
import { getRegimeTimeline, getStockResults } from '../services/api';

const Research = ({ selectedTicker }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [regimeData, setRegimeData] = useState([]);
  const [resultsData, setResultsData] = useState([]);

  useEffect(() => {
    fetchResearchData(selectedTicker);
  }, [selectedTicker]);

  const fetchResearchData = async (ticker) => {
    setLoading(true);
    setError(false);
    try {
      const [regimeResp, resultsResp] = await Promise.allSettled([
        getRegimeTimeline(ticker),
        getStockResults(ticker)
      ]);
      
      if (regimeResp.status === 'fulfilled') setRegimeData(regimeResp.value);
      if (resultsResp.status === 'fulfilled' && resultsResp.value) setResultsData(resultsResp.value);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => fetchResearchData(selectedTicker)} type="api" />;

  return (
    <div className="space-y-6 fade-in animate-in pb-12 mt-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">Research Parameters</h2>
        <p className="text-sm text-muted-foreground">Regime configuration and experimental hyperparameters for {selectedTicker}</p>
      </div>
      
      <div className="glass-card p-6 h-40 mt-6">
        <RegimeTimeline data={regimeData.length > 0 ? regimeData : resultsData} />
      </div>

      <div className="mt-6">
        <ResearchConfig />
      </div>
    </div>
  );
};

export default Research;
