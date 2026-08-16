import React, { useState, useEffect } from 'react';
import StockOverview from '../components/StockOverview';
import MetricCard from '../components/MetricCard';
import PredictionChart from '../components/PredictionChart';
import RegimeSummary from '../components/RegimeSummary';
import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { getStockResults, getRegimeTimeline, getModelComparison, getShapData } from '../services/api';

const Dashboard = ({ selectedTicker }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  
  const [resultsData, setResultsData] = useState([]);
  const [latestData, setLatestData] = useState(null);
  useEffect(() => {
    fetchDashboardData(selectedTicker);
  }, [selectedTicker]);

  const fetchDashboardData = async (ticker) => {
    setLoading(true);
    setError(false);
    setEmpty(false);

    try {
      const results = await getStockResults(ticker);
      
      if (!results || results.length === 0) {
        setEmpty(true);
        setLoading(false);
        return;
      }
      
      setResultsData(results);
      setLatestData(results[results.length - 1]);
      
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setEmpty(true);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const getRegimeColor = (r) => {
    switch (r?.toUpperCase()) {
      case 'LOW': return 'bg-static';
      case 'MEDIUM': return 'bg-warning';
      case 'HIGH': return 'bg-critical';
      default: return 'bg-neutral';
    }
  };

  return (
    <div className="flex-1 w-full">
      <main className="w-full mt-4">
        
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState onRetry={() => fetchDashboardData(selectedTicker)} type="api" />
        ) : empty ? (
          <EmptyState 
            onRetry={() => fetchDashboardData(selectedTicker)} 
            onSelectOther={() => {}} 
          />
        ) : (
          <div className="space-y-6 fade-in animate-in">
            
            {import.meta.env.VITE_DATA_SOURCE === 'temporary' && (
              <div className="bg-card border border-static/30 rounded-lg p-4 mb-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-static"></div>
                <h4 className="text-static font-bold tracking-tight mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-static animate-pulse"></span> DEMO DATA MODE
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Market prices are temporarily sourced from yfinance.<br/>
                  ML predictions will appear when the production research API is connected.
                </p>
              </div>
            )}

            <StockOverview ticker={selectedTicker} latestData={latestData} />

            {/* KPI Cards: 4 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard 
                title="Actual Price" 
                value={`₹${latestData?.Actual_Price?.toFixed(2) || '—'}`} 
                subtitle={latestData?.Actual_Return_Pct ? `${latestData.Actual_Return_Pct > 0 ? '+' : ''}${latestData.Actual_Return_Pct.toFixed(2)}%` : null}
                subtitleClassName={latestData?.Actual_Return_Pct > 0 ? 'text-adaptive' : 'text-critical'}
                footer="Latest available market observation"
              />
              <MetricCard 
                title="Static Meta-Model" 
                value={latestData?.y_hat_Static !== null && latestData?.y_hat_Static !== undefined ? `₹${latestData.y_hat_Static.toFixed(2)}` : 'ML RESULT PENDING'}
                valueClassName={latestData?.y_hat_Static !== null ? "text-static" : "text-muted-foreground text-xl"}
                footer={latestData?.y_hat_Static !== null ? "Frozen coefficients" : "Production ML API required"}
              />
              <MetricCard 
                title="Adaptive Meta-Model" 
                value={latestData?.y_hat_Adaptive !== null && latestData?.y_hat_Adaptive !== undefined ? `₹${latestData.y_hat_Adaptive.toFixed(2)}` : 'ML RESULT PENDING'}
                valueClassName={latestData?.y_hat_Adaptive !== null ? "text-adaptive" : "text-muted-foreground text-xl"}
                footer={latestData?.y_hat_Adaptive !== null ? "Regime-conditioned" : "Production ML API required"}
              />
              <MetricCard 
                title={import.meta.env.VITE_DATA_SOURCE === 'temporary' ? "Temporary Volatility View" : "Current Regime"}
                value={latestData?.Regime_Flag || (import.meta.env.VITE_DATA_SOURCE === 'temporary' ? 'UNAVAILABLE' : '—')}
                footer={import.meta.env.VITE_DATA_SOURCE === 'temporary' ? "Production ML API required" : "20D volatility regime"}
                indicatorColor={getRegimeColor(latestData?.Regime_Flag)}
              />
            </div>

            {/* Main Chart + Regime Summary: 12 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
              <div className="lg:col-span-12 xl:col-span-9 h-[500px]">
                <PredictionChart data={resultsData} />
              </div>
              <div className="hidden xl:block xl:col-span-3 glass-card">
                <RegimeSummary latestData={latestData} />
              </div>
            </div>

            {/* Data Source Panel */}
            {import.meta.env.VITE_DATA_SOURCE === 'temporary' && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6 bg-card border border-border p-6 rounded-xl shadow-md">
                <div className="col-span-1 md:col-span-4 mb-2 border-b border-border pb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Data Source</h3>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Temporary Source</span>
                  <span className="font-medium text-sm text-foreground">Yahoo Finance via yfinance</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Frequency</span>
                  <span className="font-medium text-sm text-foreground">Daily</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Purpose</span>
                  <span className="font-medium text-sm text-foreground">Frontend development / demonstration</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Status</span>
                  <span className="font-medium text-sm text-warning">Temporary</span>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
