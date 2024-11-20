import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ setWalletAddress }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const tempProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await tempProvider.send('eth_requestAccounts', []);
      setProvider(tempProvider);
      setWalletAddress(accounts[0]);
      setIsConnected(true);
    } else {
      alert('Please install MetaMask or another Ethereum wallet extension.');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      const checkConnection = async () => {
        const tempProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await tempProvider.listAccounts();
        if (accounts.length > 0) {
          setProvider(tempProvider);
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      };
      checkConnection();
    }
  }, []);

  return (
    <div className="space-x-4">
      {!isConnected ? (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={disconnectWallet}
        >
          Disconnect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;