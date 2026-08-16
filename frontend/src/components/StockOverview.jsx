import React from 'react';

const StockOverview = ({ ticker, latestData }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8 border-b border-border pb-6">
      <div>
        <h1 className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase mb-1">
          Market Intelligence
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-1">
          Adaptive ensemble monitoring & historical backtest analysis
        </h2>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-3xl font-bold text-foreground">{ticker}</span>
          <span className="px-2 py-1 bg-secondary-bg text-xs font-medium rounded-md border border-border text-muted-foreground">
            NSE • Selected Equity
          </span>
          <div className="flex items-center gap-1.5 ml-2 px-2 py-1 rounded-full border border-adaptive/20 bg-adaptive/10">
            <div className="h-1.5 w-1.5 rounded-full bg-adaptive animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-wider text-adaptive uppercase">Backtest Available</span>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex items-center gap-8 text-sm">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Last Available</span>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-lg">₹{latestData?.Actual_Price?.toFixed(2) || '—'}</span>
            {latestData?.Actual_Return_Pct && (
              <span className={`text-xs font-bold ${latestData.Actual_Return_Pct > 0 ? 'text-adaptive' : 'text-critical'}`}>
                {latestData.Actual_Return_Pct > 0 ? '+' : ''}{latestData.Actual_Return_Pct.toFixed(2)}%
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Static</span>
          <span className="font-semibold text-lg text-static">
            {latestData?.y_hat_Static !== null && latestData?.y_hat_Static !== undefined 
              ? `₹${latestData.y_hat_Static.toFixed(2)}` 
              : 'PENDING'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Adaptive</span>
          <span className="font-semibold text-lg text-adaptive">
            {latestData?.y_hat_Adaptive !== null && latestData?.y_hat_Adaptive !== undefined
              ? `₹${latestData.y_hat_Adaptive.toFixed(2)}` 
              : 'PENDING'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockOverview;
