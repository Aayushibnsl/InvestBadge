import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Trophy, Users, Home } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { shortenAddress } from '../utils/web3';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users },
  ];

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Trophy size={20} className="text-gray-900" />
              </div>
              <h1 className="text-xl font-bold text-white">InvestBadge</h1>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'text-yellow-400 bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-300">
                  {shortenAddress(address!)}
                </div>
                <motion.button
                  onClick={disconnect}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Disconnect
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={connect}
                disabled={isConnecting}
                className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wallet size={18} />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
};