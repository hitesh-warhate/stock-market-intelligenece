import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const WhyAdaptive = () => {
  return (
    <div className="glass-card p-6 h-full flex flex-col bg-gradient-to-br from-card to-card-hover border-adaptive/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-adaptive/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      
      <h3 className="text-sm font-semibold uppercase tracking-widest text-adaptive mb-4 flex items-center gap-2">
        Why Adaptive?
      </h3>
      
      <p className="text-[13px] leading-relaxed text-muted-foreground mb-4">
        The static meta-model keeps its coefficients fixed after training. The <strong className="text-foreground font-medium">adaptive model</strong> monitors prediction residuals and updates its coefficient estimates when market drift is detected.
      </p>
      
      <p className="text-[13px] leading-relaxed text-muted-foreground mb-6">
        The objective is to evaluate whether regime-aware coefficient adaptation improves predictive behavior under changing market conditions.
      </p>

      <div className="mt-auto bg-secondary-bg/50 rounded-lg p-4 border border-border/50 text-[11px] font-medium tracking-wide">
        <div className="flex items-center justify-between mb-2 text-muted-foreground">
          <span>LSTM + ANN</span>
          <ArrowRight className="w-3 h-3" />
          <span>Meta-Model</span>
          <ArrowRight className="w-3 h-3" />
          <span>Prediction</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-adaptive">
          <ArrowUpRight className="w-3 h-3" />
          <span>Regime + Drift Adaptive Update</span>
        </div>
      </div>
    </div>
  );
};

export default WhyAdaptive;
