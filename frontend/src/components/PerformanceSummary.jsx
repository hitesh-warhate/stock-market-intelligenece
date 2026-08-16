import React from 'react';

const PerformanceSummary = ({ metrics }) => {
  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Performance Summary</h3>
        <p className="text-xs text-muted-foreground mt-1">Independent baseline evaluation</p>
      </div>

      {import.meta.env.VITE_DATA_SOURCE === 'temporary' ? (
        <div className="flex-1 flex items-center justify-center text-sm font-medium text-muted-foreground border border-dashed border-border rounded-lg bg-secondary-bg/30">
          RESEARCH RESULTS PENDING
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-[10px] uppercase tracking-wider">
              <th className="py-3 px-2 font-medium">Metric</th>
              <th className="py-3 px-2 font-medium">LSTM+ANN</th>
              <th className="py-3 px-2 font-medium">RF</th>
              <th className="py-3 px-2 font-medium">XGB</th>
              <th className="py-3 px-2 font-medium text-static">Static Meta</th>
              <th className="py-3 px-2 font-medium text-adaptive">Adaptive Meta</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            <tr className="border-b border-border/50 hover:bg-secondary-bg/50 transition-colors">
              <td className="py-3 px-2 font-medium text-muted-foreground">MAE</td>
              <td className="py-3 px-2">—</td>
              <td className="py-3 px-2">—</td>
              <td className="py-3 px-2">—</td>
              <td className="py-3 px-2 text-static font-medium">{metrics?.static?.MAE ?? '—'}</td>
              <td className="py-3 px-2 text-adaptive font-medium">{metrics?.adaptive?.MAE ?? '—'}</td>
            </tr>
            <tr className="border-b border-border/50 hover:bg-secondary-bg/50 transition-colors">
              <td className="py-3 px-2 font-medium text-muted-foreground">RMSE</td>
              <td className="py-3 px-2">—</td>
              <td className="py-3 px-2">—</td>
              <td className="py-3 px-2">—</td>
              <td className="py-3 px-2 text-static font-medium">{metrics?.static?.RMSE ?? '—'}</td>
              <td className="py-3 px-2 text-adaptive font-medium">{metrics?.adaptive?.RMSE ?? '—'}</td>
            </tr>
            <tr className="hover:bg-secondary-bg/50 transition-colors">
              <td className="py-3 px-2 font-medium text-muted-foreground">R²</td>
              <td className="py-3 px-2">—</td>
              <td className="py-3 px-2">—</td>
              <td className="py-3 px-2">—</td>
              <td className="py-3 px-2 text-static font-medium">{metrics?.static?.R2 ?? '—'}</td>
              <td className="py-3 px-2 text-adaptive font-medium">{metrics?.adaptive?.R2 ?? '—'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default PerformanceSummary;
