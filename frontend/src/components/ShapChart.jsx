import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const ShapChart = ({ shapData }) => {
  const [activeTab, setActiveTab] = useState('RF');

  const isTemporary = import.meta.env.VITE_DATA_SOURCE === 'temporary';

  if (isTemporary || !shapData || (!shapData.RF && !shapData.XGBoost)) {
    return (
      <div className="glass-card p-6 h-full flex flex-col">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">SHAP ANALYSIS</h3>
        <div className="flex-1 flex flex-col items-center justify-center text-sm font-medium text-muted-foreground border border-dashed border-border rounded-lg bg-secondary-bg/30 p-6 text-center">
          <p>Available when the production RF/XGBoost</p>
          <p>results are connected.</p>
        </div>
      </div>
    );
  }

  const dataToDisplay = activeTab === 'RF' ? shapData.RF : shapData.XGBoost;

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Feature Importance</h3>
          <p className="text-xs text-muted-foreground mt-1">Explainability for tree-based baselines</p>
        </div>
        
        <div className="flex bg-secondary-bg rounded-lg p-1 border border-border">
          <button 
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'RF' ? 'bg-card text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('RF')}
            disabled={!shapData.RF}
          >
            Random Forest
          </button>
          <button 
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'XGBoost' ? 'bg-card text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('XGBoost')}
            disabled={!shapData.XGBoost}
          >
            XGBoost
          </button>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        {dataToDisplay && dataToDisplay.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataToDisplay}
              layout="vertical"
              margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis dataKey="feature" type="category" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'var(--color-secondary-bg)' }}
                contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px', color: 'var(--color-foreground)' }}
                itemStyle={{ color: 'var(--color-foreground)', fontWeight: 600 }}
              />
              <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={24}>
                {dataToDisplay.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--color-static)' : 'var(--color-muted-foreground)'} opacity={index === 0 ? 1 : 0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-muted-foreground border border-dashed border-border rounded-lg bg-secondary-bg/30">
            No SHAP features available for {activeTab}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShapChart;
