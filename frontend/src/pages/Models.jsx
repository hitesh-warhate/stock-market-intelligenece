import React, { useState, useEffect } from 'react';
import PerformanceSummary from '../components/PerformanceSummary';
import ShapChart from '../components/ShapChart';
import WhyAdaptive from '../components/WhyAdaptive';
import { LoadingState, ErrorState } from '../components/States';
import { getModelComparison, getShapData } from '../services/api';

const Models = ({ selectedTicker }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [metricsData, setMetricsData] = useState(null);
  const [shapData, setShapData] = useState(null);

  useEffect(() => {
    fetchModelsData(selectedTicker);
  }, [selectedTicker]);

  const fetchModelsData = async (ticker) => {
    setLoading(true);
    setError(false);
    try {
      const [comparisonResp, shapResp] = await Promise.allSettled([
        getModelComparison(ticker),
        getShapData(ticker)
      ]);
      
      if (comparisonResp.status === 'fulfilled') setMetricsData(comparisonResp.value);
      if (shapResp.status === 'fulfilled') setShapData(shapResp.value);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => fetchModelsData(selectedTicker)} type="api" />;

  return (
    <div className="space-y-6 fade-in animate-in pb-12 mt-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">Model Analytics</h2>
        <p className="text-sm text-muted-foreground">Baseline evaluation and SHAP feature importance for {selectedTicker}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-8">
          <PerformanceSummary metrics={metricsData} />
        </div>
        <div className="lg:col-span-4">
          <WhyAdaptive />
        </div>
      </div>

      <div className="mt-6">
        <ShapChart shapData={shapData} />
      </div>
    </div>
  );
};

export default Models;
