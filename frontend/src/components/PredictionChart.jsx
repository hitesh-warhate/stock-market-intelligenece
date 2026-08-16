import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, subDays } from 'date-fns';

const PredictionChart = ({ data }) => {
  const [filter, setFilter] = useState('ALL');

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    let daysToKeep = data.length;
    switch (filter) {
      case '30D': daysToKeep = 30; break;
      case '90D': daysToKeep = 90; break;
      case '6M': daysToKeep = 180; break;
      case '1Y': daysToKeep = 252; break; // Trading days
      default: daysToKeep = data.length;
    }

    const sliced = data.slice(Math.max(0, data.length - daysToKeep));
    
    return sliced.map(d => ({
      ...d,
      displayDate: d.Date ? format(new Date(d.Date), 'MMM yyyy') : '',
      shortDate: d.Date ? format(new Date(d.Date), 'dd MMM yyyy') : '',
    }));
  }, [data, filter]);

  const isProfit = useMemo(() => {
    if (!filteredData || filteredData.length < 2) return true;
    const firstPrice = filteredData[0].Actual_Price;
    const lastPrice = filteredData[filteredData.length - 1].Actual_Price;
    return lastPrice >= firstPrice;
  }, [filteredData]);

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="glass-card flex h-[400px] items-center justify-center text-muted-foreground">
        No chart data available
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-card p-4 shadow-xl backdrop-blur-md">
          <p className="mb-3 font-semibold text-foreground border-b border-border pb-2">{payload[0].payload.shortDate}</p>
          <div className="space-y-2">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="h-2.5 w-2.5 rounded-full shadow-sm" 
                    style={{ backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}40` }}
                  />
                  <span className="text-muted-foreground">{entry.name}</span>
                </div>
                <span className="font-semibold text-foreground">₹{Number(entry.value).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const filterOptions = ['30D', '90D', '6M', '1Y', 'ALL'];
  const isTemporary = import.meta.env.VITE_DATA_SOURCE === 'temporary';

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-foreground uppercase">
            {isTemporary ? 'Market Price History' : 'Static vs Adaptive Meta-Model'}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {isTemporary ? 'Temporary yfinance market data' : 'Historical walk-forward backtest'}
          </p>
        </div>
        
        <div className="flex bg-secondary-bg rounded-lg p-1 border border-border">
          {filterOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                filter === opt 
                  ? 'bg-card text-foreground shadow-sm border border-border/50' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="displayDate" 
              stroke="var(--color-muted-foreground)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              minTickGap={40}
              dy={10}
            />
            <YAxis 
              domain={['auto', 'auto']}
              stroke="var(--color-muted-foreground)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
              iconSize={8}
            />
            <Line 
              type="monotone" 
              dataKey="Actual_Price" 
              name={isTemporary ? "Close Price" : "Actual"} 
              stroke={isTemporary ? (isProfit ? '#10B981' : '#F43F5E') : '#F5F7FA'} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: isTemporary ? (isProfit ? '#10B981' : '#F43F5E') : '#F5F7FA' }}
            />
            {!isTemporary && (
              <>
                <Line 
                  type="monotone" 
                  dataKey="y_hat_Static" 
                  name="Static" 
                  stroke="#60A5FA" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#60A5FA' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="y_hat_Adaptive" 
                  name="Adaptive" 
                  stroke="#22C55E" 
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#22C55E' }}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PredictionChart;
