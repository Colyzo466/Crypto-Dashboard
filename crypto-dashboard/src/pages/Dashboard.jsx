import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import WalletConnect from '../components/WalletConnect';
import useCryptoWebSocket from '../hooks/useCryptoWebSocket';
import PriceChart from '../components/PriceChart';
import DarkModeToggle from '../components/DarkModeToggle';

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [walletAddress, setWalletAddress] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState('btcusdt');
  const [chartData, setChartData] = useState([]);
  const realTimePrice = useCryptoWebSocket(selectedSymbol);
  const [priceThreshold, setPriceThreshold] = useState('');
  const [alertActive, setAlertActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch crypto data
  useEffect(() => {
    const fetchCryptoData = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            
            params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 10 },
          }
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };
    fetchCryptoData();
  }, []);

  // Handle symbol change
  const handleSymbolChange = (e) => {
    setSelectedSymbol(e.target.value);
  };

  // Fetch historical data based on selected symbol
  useEffect(() => {
    const fetchHistoricalData = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${selectedSymbol}/market_chart`,
        { params: { vs_currency: 'usd', days: '7' } }
      );
      const data = response.data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price,
      }));
      setChartData(data);
    };
    fetchHistoricalData();
  }, [selectedSymbol]);

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  // Check for price alerts
  useEffect(() => {
    if (alertActive && realTimePrice) {
      const price = parseFloat(realTimePrice);
      const threshold = parseFloat(priceThreshold);
      if (threshold && (price >= threshold || price <= threshold)) {
        new Notification(`Price Alert! ${selectedSymbol.toUpperCase()} price crossed your threshold of $${threshold}. Current price: $${price}`);
      }
    }
  }, [realTimePrice, alertActive, priceThreshold, selectedSymbol]);

  const handleSetAlert = () => {
    if (priceThreshold) {
      setAlertActive(true);
      alert(`Price alert set for $${priceThreshold}`);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Crypto Dashboard
        </h2>
        <DarkModeToggle />
      </div>
      <WalletConnect setWalletAddress={setWalletAddress} />
      {walletAddress && (
        <div className="mt-4 text-xl">
          <p>
            Connected Wallet: {typeof walletAddress === 'string' ? walletAddress : walletAddress.address}
          </p>
        </div>
      )}
      <div className="mt-4">
        <label className="block mb-2">Select Trading Pair:</label>
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedSymbol}
          onChange={handleSymbolChange}
        >
          <option value="btcusdt">BTC/USDT</option>
          <option value="ethusdt">ETH/USDT</option>
          <option value="adausdt">ADA/USDT</option>
        </select>
      </div>
      <div class ="text-xl mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <BeatLoader size={15} color={"#4A90E2"} loading={isLoading} />
          </div>
        ) : (
          <p>
            Real-Time {selectedSymbol.toUpperCase()} Price: $ 
            {realTimePrice || 'Loading...'}
          </p>
        )}
      </div>
      <div className="mt-4">
        <label className="block mb-2">Set Price Alert Threshold:</label>
        <input
          type="number"
          className="p-2 border border-gray-300 rounded"
          value={priceThreshold}
          onChange={(e) => setPriceThreshold(e.target.value)}
          placeholder="Enter price threshold"
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded"
          onClick={handleSetAlert}
        >
          Set Alert
        </button>
      </div>
      <PriceChart chartData={chartData} /> {/* Render the PriceChart here */}
      <div className="overflow-x-auto mt-6">
        {isLoading ? (
          <div className="flex justify-center mt-10">
            <BeatLoader size={15} color="#4A90E2" />
          </div>
        ) : (
          <table className="table-auto w-full text-left bg-gray-100 dark:bg-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((coin, index) => (
                <tr key={coin.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 flex items-center">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                    {coin.name}
                  </td>
                  <td className="border px-4 py-2">${coin.current_price.toFixed(2)}</td>
                  <td
                    className={`border px-4 py-2 ${
                      coin.price_change_percentage_24h > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;