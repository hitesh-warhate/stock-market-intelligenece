import React from 'react';

const ResearchConfig = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div className="glass-card p-6 lg:col-span-2">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">Experiment Configuration</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-secondary-bg/30 rounded-lg p-3 border border-border/50">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Train Window</span>
            <span className="font-medium text-foreground text-sm">252 Days</span>
          </div>
          <div className="bg-secondary-bg/30 rounded-lg p-3 border border-border/50">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Test Window</span>
            <span className="font-medium text-foreground text-sm">21 Days</span>
          </div>
          <div className="bg-secondary-bg/30 rounded-lg p-3 border border-border/50">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Step</span>
            <span className="font-medium text-foreground text-sm">21 Days</span>
          </div>
          <div className="bg-secondary-bg/30 rounded-lg p-3 border border-border/50">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Drift Window</span>
            <span className="font-medium text-foreground text-sm">30 Days</span>
          </div>
          <div className="bg-secondary-bg/30 rounded-lg p-3 border border-border/50">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Drift Threshold</span>
            <span className="font-medium text-foreground text-sm">|z| &gt; 2.0</span>
          </div>
          <div className="bg-secondary-bg/30 rounded-lg p-3 border border-border/50">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Adaptive Refit</span>
            <span className="font-medium text-foreground text-sm">60 Days</span>
          </div>
          <div className="bg-secondary-bg/30 rounded-lg p-3 border border-border/50">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Regularization</span>
            <span className="font-medium text-foreground text-sm">Ridge L2</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">Methodology</h3>
        <div className="space-y-4">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Base Architecture</span>
            <span className="font-medium text-sm text-foreground">LSTM + ANN Stacking</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Control</span>
            <span className="font-medium text-sm text-foreground">Static Linear Meta-Model</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Contribution</span>
            <span className="font-medium text-sm text-adaptive">Regime-Adaptive Meta-Model</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Validation</span>
            <span className="font-medium text-sm text-foreground">Walk-forward Cross Validation</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Target</span>
            <span className="font-medium text-sm text-foreground">Next-day Log Return</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ResearchConfig;
