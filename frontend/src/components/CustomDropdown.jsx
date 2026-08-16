import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

const CustomDropdown = ({ stocks, selectedStock, onSelectStock }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStocks = stocks.filter(stock => {
    const ticker = typeof stock === 'string' ? stock : stock.ticker;
    return ticker.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="relative w-full text-left" ref={dropdownRef}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:border-muted-foreground/50 hover:bg-card-hover transition-colors focus:outline-none focus:ring-2 focus:ring-static/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-static"></span>
          {selectedStock || 'Select Stock'}
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-full sm:w-[280px] origin-top-right rounded-lg border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="p-2 border-b border-border bg-secondary-bg">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                className="w-full bg-card border border-border rounded-md pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-static focus:ring-1 focus:ring-static transition-colors"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
            {filteredStocks.length === 0 ? (
              <div className="py-4 text-center text-sm text-muted-foreground">
                No stocks found.
              </div>
            ) : (
              filteredStocks.map((stock) => {
                const ticker = typeof stock === 'string' ? stock : stock.ticker;
                const isSelected = ticker === selectedStock;
                return (
                  <button
                    key={ticker}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                      isSelected ? 'bg-static/10 text-static font-medium' : 'text-foreground hover:bg-secondary-bg'
                    }`}
                    onClick={() => {
                      onSelectStock(ticker);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                  >
                    <span>{ticker}</span>
                    {isSelected && <Check className="h-4 w-4" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
