import { useState, useEffect } from 'react';
import { connectWallet } from '../utils/web3';

export const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts.length > 0) {
            setAddress(accounts[0]);
          }
        } catch (error) {
          console.error('Failed to check connection:', error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAddress(accounts.length > 0 ? accounts[0] : null);
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    const walletAddress = await connectWallet();
    if (walletAddress) {
      setAddress(walletAddress);
    }
    setIsConnecting(false);
  };

  const disconnect = () => {
    setAddress(null);
  };

  return {
    address,
    isConnected: !!address,
    isConnecting,
    connect,
    disconnect,
  };
};