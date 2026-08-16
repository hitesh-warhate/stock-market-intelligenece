from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
import pandas as pd
import numpy as np
import time
from functools import lru_cache

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})

# Predefined NSE universe
STOCKS = [
    {"ticker": "INFY", "name": "Infosys"},
    {"ticker": "TCS", "name": "TCS"},
    {"ticker": "RELIANCE", "name": "Reliance Industries"},
    {"ticker": "HDFCBANK", "name": "HDFC Bank"},
    {"ticker": "ICICIBANK", "name": "ICICI Bank"},
    {"ticker": "SBIN", "name": "State Bank of India"},
    {"ticker": "ITC", "name": "ITC"},
    {"ticker": "LT", "name": "Larsen & Toubro"},
    {"ticker": "MARUTI", "name": "Maruti Suzuki"},
    {"ticker": "SUNPHARMA", "name": "Sun Pharma"}
]

# Simple in-memory cache
cache = {}
CACHE_TTL = 300  # 5 minutes

def fetch_with_retry(fetch_func, max_retries=3):
    for attempt in range(1, max_retries + 1):
        try:
            return fetch_func()
        except Exception as e:
            if attempt == max_retries:
                raise e
            time.sleep(attempt * 0.5)

@app.route('/health')
def health():
    return jsonify({
        "status": "ok",
        "source": "yfinance",
        "temporary": True
    })

@app.route('/api/stocks')
def get_stocks():
    return jsonify({"stocks": STOCKS})

@app.route('/api/stocks/<ticker>/summary')
def get_stock_summary(ticker):
    ns_ticker = f"{ticker}.NS"
    cache_key = f"summary_{ns_ticker}"
    
    if cache_key in cache and time.time() - cache[cache_key]['time'] < CACHE_TTL:
        return jsonify(cache[cache_key]['data'])

    try:
        def fetch_info():
            t = yf.Ticker(ns_ticker)
            return t.fast_info

        info = fetch_with_retry(fetch_info)
        
        last_price = info.last_price if hasattr(info, 'last_price') else None
        prev_close = info.previous_close if hasattr(info, 'previous_close') else None
        
        change = (last_price - prev_close) if last_price and prev_close else 0
        change_percent = (change / prev_close * 100) if prev_close else 0

        data = {
            "ticker": ticker,
            "price": float(last_price) if last_price is not None else None,
            "previousClose": float(prev_close) if prev_close is not None else None,
            "change": float(change) if change is not None else 0,
            "changePercent": float(change_percent) if change_percent is not None else 0,
            "lastUpdated": pd.Timestamp.now().isoformat()
        }
        
        cache[cache_key] = {'data': data, 'time': time.time()}
        return jsonify(data)
    except Exception as e:
        print(f"Error fetching summary for {ticker}: {e}")
        return jsonify({"error": "Market data unavailable"}), 503

@app.route('/api/stocks/<ticker>/history')
def get_stock_history(ticker):
    period = request.args.get('period', '1y')
    valid_periods = ['1mo', '3mo', '6mo', '1y', '2y', '5y']
    if period not in valid_periods:
        period = '1y'

    ns_ticker = f"{ticker}.NS"
    cache_key = f"history_{ns_ticker}_{period}"
    
    if cache_key in cache and time.time() - cache[cache_key]['time'] < CACHE_TTL:
        return jsonify(cache[cache_key]['data'])

    try:
        def fetch_hist():
            t = yf.Ticker(ns_ticker)
            return t.history(period=period)

        hist = fetch_with_retry(fetch_hist)
        
        if hist.empty:
            return jsonify({"error": "No data found"}), 404

        # Calculate indicators
        hist['20d_Vol'] = hist['Close'].pct_change().rolling(window=20).std() * np.sqrt(252)
        
        # ATR
        high_low = hist['High'] - hist['Low']
        high_close = np.abs(hist['High'] - hist['Close'].shift())
        low_close = np.abs(hist['Low'] - hist['Close'].shift())
        ranges = pd.concat([high_low, high_close, low_close], axis=1)
        true_range = np.max(ranges, axis=1)
        hist['ATR_20'] = true_range.rolling(20).mean()

        hist.reset_index(inplace=True)
        
        # Format for JSON
        data_list = []
        for _, row in hist.iterrows():
            # Date can be tz-aware
            dt_str = row['Date'].strftime('%Y-%m-%d') if hasattr(row['Date'], 'strftime') else str(row['Date'])
            
            data_list.append({
                "Date": dt_str,
                "Open": float(row['Open']) if not pd.isna(row['Open']) else None,
                "High": float(row['High']) if not pd.isna(row['High']) else None,
                "Low": float(row['Low']) if not pd.isna(row['Low']) else None,
                "Close": float(row['Close']) if not pd.isna(row['Close']) else None,
                "Volume": int(row['Volume']) if not pd.isna(row['Volume']) else 0,
                "Vol_20d": float(row['20d_Vol']) if not pd.isna(row['20d_Vol']) else None,
                "ATR_20": float(row['ATR_20']) if not pd.isna(row['ATR_20']) else None
            })

        response_data = {
            "ticker": ticker,
            "source": "yfinance",
            "temporary": True,
            "data": data_list
        }
        
        cache[cache_key] = {'data': response_data, 'time': time.time()}
        return jsonify(response_data)
        
    except Exception as e:
        print(f"Error fetching history for {ticker}: {e}")
        return jsonify({"error": "Yahoo Finance data could not be retrieved."}), 503

if __name__ == '__main__':
    app.run(port=8000, debug=True)
