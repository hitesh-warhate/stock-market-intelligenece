import React from 'react';
import { RefreshCw, Database } from 'lucide-react';

export const EmptyState = ({ message = "No historical results are available for this stock at the moment.", onRetry, onSelectOther }) => (
  <div className="glass-card flex flex-col items-center justify-center p-12 text-center min-h-[500px]">
    <div className="w-16 h-16 rounded-full bg-secondary-bg flex items-center justify-center mb-6 shadow-inner border border-border/50">
      <div className="w-3 h-3 rounded-full border-2 border-muted-foreground"></div>
    </div>
    <h3 className="text-xl font-bold tracking-tight text-foreground mb-3 uppercase">Backtest Unavailable</h3>
    <p className="text-muted-foreground max-w-sm mb-2 text-sm leading-relaxed">{message}</p>
    <p className="text-muted-foreground max-w-sm mb-8 text-sm leading-relaxed">
      This may occur when the stock does not satisfy the data-history requirements or the ML pipeline has not generated results yet.
    </p>
    
    <div className="flex gap-4">
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 bg-secondary-bg hover:bg-card-hover text-foreground border border-border px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm"
        >
          <RefreshCw className="h-4 w-4" /> Retry
        </button>
      )}
      {/* Assuming onSelectOther might open dropdown or do something else, but normally user just uses top nav */}
    </div>
  </div>
);

export const ErrorState = ({ onRetry, type = "api" }) => {
  const isApiError = type === "api";
  
  return (
    <div className="glass-card flex flex-col items-center justify-center p-12 text-center min-h-[500px]">
      <div className="w-16 h-16 rounded-full bg-critical/10 flex items-center justify-center mb-6 border border-critical/20">
        <Database className="h-6 w-6 text-critical" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-foreground mb-3 uppercase">
        {isApiError ? 'Connection Problem' : 'Analysis Service Unavailable'}
      </h3>
      <p className="text-muted-foreground max-w-sm mb-8 text-sm leading-relaxed">
        {isApiError 
          ? "The dashboard couldn't reach the analysis API. Please ensure the backend is running." 
          : "The analysis service is temporarily unavailable or returned a malformed response."}
      </p>
      <button 
        onClick={onRetry}
        className="flex items-center gap-2 bg-secondary-bg hover:bg-card-hover text-foreground border border-border px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm"
      >
        <RefreshCw className="h-4 w-4" /> Retry Connection
      </button>
    </div>
  );
};

export const LoadingState = () => (
  <div className="space-y-8 w-full animate-in fade-in duration-500">
    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 border-b border-border pb-6">
      <div className="space-y-3">
        <div className="h-4 w-32 bg-secondary-bg rounded-md animate-pulse"></div>
        <div className="h-8 w-96 bg-secondary-bg rounded-md animate-pulse"></div>
        <div className="h-10 w-48 bg-secondary-bg rounded-md animate-pulse mt-4"></div>
      </div>
      <div className="flex gap-8">
        <div className="space-y-2"><div className="h-3 w-16 bg-secondary-bg rounded-md animate-pulse"></div><div className="h-6 w-24 bg-secondary-bg rounded-md animate-pulse"></div></div>
        <div className="space-y-2"><div className="h-3 w-16 bg-secondary-bg rounded-md animate-pulse"></div><div className="h-6 w-24 bg-secondary-bg rounded-md animate-pulse"></div></div>
        <div className="space-y-2"><div className="h-3 w-16 bg-secondary-bg rounded-md animate-pulse"></div><div className="h-6 w-24 bg-secondary-bg rounded-md animate-pulse"></div></div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="glass-card p-5 h-32 flex flex-col justify-between">
          <div className="h-3 w-24 bg-secondary-bg rounded-md animate-pulse"></div>
          <div className="h-8 w-32 bg-secondary-bg rounded-md animate-pulse mt-2"></div>
          <div className="h-2 w-48 bg-secondary-bg rounded-md animate-pulse mt-auto"></div>
        </div>
      ))}
    </div>

    <div className="glass-card p-6 h-[450px] flex flex-col">
      <div className="flex justify-between mb-8">
        <div className="space-y-2">
          <div className="h-5 w-64 bg-secondary-bg rounded-md animate-pulse"></div>
          <div className="h-3 w-40 bg-secondary-bg rounded-md animate-pulse"></div>
        </div>
        <div className="h-8 w-48 bg-secondary-bg rounded-md animate-pulse"></div>
      </div>
      <div className="flex-1 w-full bg-secondary-bg/30 rounded-lg animate-pulse border border-border/50"></div>
    </div>
  </div>
);
