import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Search, ChevronDown } from 'lucide-react';
import CustomDropdown from './CustomDropdown';

const Navbar = ({ apiConnected, stocks, selectedTicker, onSelectStock }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-[72px] items-center px-6 max-w-[1440px] mx-auto">
        <div className="flex gap-3 items-center mr-8 cursor-default">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-static to-adaptive flex items-center justify-center shadow-lg">
            <Activity className="h-5 w-5 text-background" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-tight text-foreground">INDIAN STOCK INTELLIGENCE</span>
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mt-0.5">Adaptive Ensemble Platform</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-1 text-sm font-medium">
          <NavLink 
            to="/" 
            className={({ isActive }) => `px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-secondary-bg text-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary-bg hover:text-foreground'}`}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/models" 
            className={({ isActive }) => `px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-secondary-bg text-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary-bg hover:text-foreground'}`}
          >
            Models
          </NavLink>
          <NavLink 
            to="/research" 
            className={({ isActive }) => `px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-secondary-bg text-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary-bg hover:text-foreground'}`}
          >
            Research
          </NavLink>
        </div>

        <div className="ml-auto flex items-center space-x-6">
          {import.meta.env.VITE_DATA_SOURCE === 'temporary' ? (
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase bg-secondary-bg px-3 py-1.5 rounded-full border border-static">
              <div className="h-2 w-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] bg-static shadow-static/50"></div>
              <span className="text-static">YFINANCE DEMO</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase bg-secondary-bg px-3 py-1.5 rounded-full border border-border">
              <div className={`h-2 w-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] ${apiConnected ? 'bg-adaptive shadow-adaptive/50' : 'bg-critical shadow-critical/50'}`}></div>
              <span className={apiConnected ? "text-adaptive" : "text-critical"}>
                {apiConnected ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
          )}

          <div className="hidden sm:block w-[240px]">
            <CustomDropdown 
              stocks={stocks} 
              selectedStock={selectedTicker} 
              onSelectStock={onSelectStock} 
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
