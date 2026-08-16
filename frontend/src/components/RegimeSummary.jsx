import React from 'react';

const RegimeSummary = ({ latestData }) => {
  const regime = latestData?.Regime_Flag?.toUpperCase() || 'UNKNOWN';
  
  const getRegimeColor = (r) => {
    switch (r) {
      case 'LOW': return 'text-static';
      case 'MEDIUM': return 'text-warning';
      case 'HIGH': return 'text-critical';
      default: return 'text-neutral';
    }
  };

  return (
    <div className="h-full flex flex-col justify-center border-l border-border pl-6 ml-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">Current Regime</h3>
      
      <div className="flex flex-col gap-5">
        <div>
          <span className={`text-xl font-bold tracking-tight ${getRegimeColor(regime)}`}>
            {regime}
          </span>
        </div>
        
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">20D ATR</span>
          <span className="font-medium text-sm text-foreground">—</span>
        </div>
        
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Drift Status</span>
          <span className="font-medium text-sm text-foreground">No active drift</span>
        </div>
      </div>
    </div>
  );
};

export default RegimeSummary;
