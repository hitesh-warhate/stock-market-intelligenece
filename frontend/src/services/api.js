const getBaseUrl = () => {
  const source = import.meta.env.VITE_DATA_SOURCE || 'production';
  if (source === 'temporary') {
    return import.meta.env.VITE_MARKET_API_URL || 'http://localhost:8000';
  }
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
};

const BASE_URL = getBaseUrl();
const IS_TEMPORARY = import.meta.env.VITE_DATA_SOURCE === 'temporary';

export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${BASE_URL}/health`);
    if (!response.ok) return false;
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
};

export const getStocks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/stocks`);
    if (!response.ok) throw new Error('Failed to fetch stocks');
    const data = await response.json();
    return data.stocks || [];
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return ['INFY', 'TCS', 'RELIANCE', 'HDFCBANK', 'ICICIBANK']; // Fallback
  }
};

export const getStockResults = async (ticker) => {
  try {
    if (IS_TEMPORARY) {
      // Map history endpoint to the expected schema
      const response = await fetch(`${BASE_URL}/api/stocks/${ticker}/history?period=1y`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      // Transform yfinance data to mock ML results format (null for ML fields)
      return data.data.map((item, index, arr) => {
        const prevClose = index > 0 ? arr[index - 1].Close : item.Open;
        const returnPct = prevClose ? ((item.Close - prevClose) / prevClose) * 100 : 0;
        
        return {
          Date: item.Date,
          Ticker: ticker,
          Actual_Price: item.Close,
          Actual_Return: item.Close - item.Open, 
          Actual_Return_Pct: returnPct,
          y_hat_Static: null,
          y_hat_Adaptive: null,
          Regime_Flag: null
        };
      });
    } else {
      const response = await fetch(`${BASE_URL}/api/stocks/${ticker}/results`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    }
  } catch (error) {
    console.error(`Error fetching results for ${ticker}:`, error);
    throw error; // Rethrow so Dashboard can show error/empty state
  }
};

export const getModelComparison = async (ticker) => {
  if (IS_TEMPORARY) return null; // Not available in temporary mode
  try {
    const response = await fetch(`${BASE_URL}/api/stocks/${ticker}/metrics`);
    if (!response.ok) throw new Error('Failed to fetch metrics');
    return await response.json();
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return null;
  }
};

export const getRegimeTimeline = async (ticker) => {
  if (IS_TEMPORARY) return []; // Not available in temporary mode
  try {
    const response = await fetch(`${BASE_URL}/api/stocks/${ticker}/regimes`);
    if (!response.ok) throw new Error('Failed to fetch regimes');
    return await response.json();
  } catch (error) {
    console.error("Error fetching regimes:", error);
    return [];
  }
};

export const getShapData = async (ticker) => {
  if (IS_TEMPORARY) return null; // Not available in temporary mode
  try {
    const response = await fetch(`${BASE_URL}/api/stocks/${ticker}/shap`);
    if (!response.ok) throw new Error('Failed to fetch SHAP data');
    return await response.json();
  } catch (error) {
    console.error("Error fetching SHAP data:", error);
    return null;
  }
};
