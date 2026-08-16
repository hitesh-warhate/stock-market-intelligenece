import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border bg-background py-8">
      <div className="container max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-semibold text-foreground tracking-tight">Indian Stock Intelligence</span>
            <span className="text-xs text-muted-foreground mt-1">Adaptive Ensemble Research Platform</span>
          </div>
          
          <div className="text-xs text-muted-foreground text-center md:text-right">
            <p>Research dashboard • Historical backtest analysis</p>
            <p className="mt-1">© 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
