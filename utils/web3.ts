import { ethers } from 'ethers';

export const connectWallet = async (): Promise<string | null> => {
  if (!window.ethereum) {
    alert('Please install MetaMask to continue');
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return accounts[0];
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    return null;
  }
};

export const getProvider = () => {
  if (window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

export const shortenAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};