import React from 'react';

const RegimeTimeline = ({ data }) => {
  const isTemporary = import.meta.env.VITE_DATA_SOURCE === 'temporary';

  if (isTemporary || !data || data.length === 0) {
    return (
      <div className="flex flex-col h-[150px] items-center justify-center glass-card text-muted-foreground p-6 text-center border border-dashed border-border">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">REGIME TIMELINE</h3>
        <p className="text-sm">Research regime results unavailable</p>
        <p className="text-sm">in temporary market-data mode.</p>
      </div>
    );
  }

  const getRegimeColor = (regime) => {
    switch (regime?.toUpperCase()) {
      case 'LOW':
        return 'bg-static/20 text-static border-static/30';
      case 'MEDIUM':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'HIGH':
        return 'bg-critical/20 text-critical border-critical/30';
      default:
        return 'bg-neutral/20 text-neutral border-neutral/30';
    }
  };

  // Group contiguous regimes
  const blocks = [];
  let currentBlock = null;

  data.forEach((item, i) => {
    const r = item.Regime_Flag || 'UNKNOWN';
    if (!currentBlock || currentBlock.regime !== r) {
      if (currentBlock) {
        currentBlock.endIndex = i - 1;
        blocks.push(currentBlock);
      }
      currentBlock = {
        regime: r,
        startIndex: i,
        startDate: item.Date
      };
    }
  });
  if (currentBlock) {
    currentBlock.endIndex = data.length - 1;
    currentBlock.endDate = data[data.length - 1].Date;
    blocks.push(currentBlock);
  }

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Market Regime Timeline</h3>
        <p className="text-xs text-muted-foreground mt-1">Volatility-based regime classification</p>
      </div>
      
      <div className="relative w-full h-12 rounded-lg overflow-hidden flex border border-border">
        {blocks.map((block, idx) => {
          const widthPercent = ((block.endIndex - block.startIndex + 1) / data.length) * 100;
          return (
            <div 
              key={idx} 
              className={`h-full flex items-center justify-center border-r last:border-r-0 text-[10px] font-bold tracking-wider ${getRegimeColor(block.regime)} transition-all hover:brightness-125`}
              style={{ width: `${widthPercent}%` }}
              title={`${block.startDate} - ${block.endDate || 'Present'}`}
            >
              {widthPercent > 12 ? block.regime : ''}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-3 text-[11px] font-medium text-muted-foreground">
        <span>{data[0]?.Date}</span>
        <span>{data[data.length - 1]?.Date}</span>
      </div>
    </div>
  );
};

export default RegimeTimeline;
