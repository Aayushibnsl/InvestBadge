import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Award, DollarSign, PieChart, Loader, CheckCircle, Upload, RefreshCw } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useWallet } from '../hooks/useWallet';
import { NFTBadge } from './NFTBadge';
import { InvestorProfile, PortfolioData } from '../types';
import { mockPortfolioData, calculateInvestorType, calculateReputationScore } from '../utils/mockData';
import { shortenAddress } from '../utils/web3';

export const Dashboard: React.FC = () => {
  const { address, isConnected } = useWallet();
  const [userProfile, setUserProfile] = useState<InvestorProfile | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(mockPortfolioData);
  const [showNotification, setShowNotification] = useState(false);
  const [isUpdatingNFT, setIsUpdatingNFT] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      // Simulate loading user profile
      const profile: InvestorProfile = {
        id: '1',
        address,
        score: calculateReputationScore(portfolioData),
        type: calculateInvestorType(portfolioData),
        portfolioValue: 185000,
        diversificationScore: 78,
        lastUpdated: new Date(),
      };
      setUserProfile(profile);

      // Show welcome notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
  }, [isConnected, address, portfolioData]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-xl mb-4"
          >
            Please connect your wallet to view your dashboard
          </motion.div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading your profile...</div>
      </div>
    );
  }

  const pieData = [
    { name: 'Stablecoins', value: portfolioData.stablecoins, color: '#10B981' },
    { name: 'Bitcoin', value: portfolioData.bitcoin, color: '#F59E0B' },
    { name: 'Altcoins', value: portfolioData.altcoins, color: '#EF4444' },
    { name: 'DeFi', value: portfolioData.defi, color: '#8B5CF6' },
  ];

  const getRiskLevel = () => {
    const riskScore = portfolioData.altcoins + portfolioData.defi;
    if (riskScore <= 30) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-400' };
    if (riskScore <= 60) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-400' };
    return { level: 'High', color: 'text-red-400', bg: 'bg-red-400' };
  };

  const handleUpdateNFT = async () => {
    setIsUpdatingNFT(true);
    setUpdateSuccess(false);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Recalculate score with some randomization
    const newScore = Math.min(100, Math.max(0, calculateReputationScore(portfolioData) + Math.floor(Math.random() * 10) - 5));
    const newType = calculateInvestorType(portfolioData);
    
    // Update user profile
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        score: newScore,
        type: newType,
        lastUpdated: new Date(),
      };
      setUserProfile(updatedProfile);
    }
    
    setIsUpdatingNFT(false);
    setUpdateSuccess(true);
    
    // Show success notification
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setUpdateSuccess(false);
    }, 5000);
  };
  const risk = getRiskLevel();

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      {/* Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center space-x-2">
            <Award size={20} />
            <span>Welcome to InvestBadge! Your NFT has been updated.</span>
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Investment Dashboard</h1>
              <p className="text-gray-400">Wallet: {shortenAddress(address!)}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Reputation Score</div>
              <div className="text-3xl font-bold text-yellow-400">{userProfile.score}/100</div>
            </div>
          </div>
        </motion.div>

        {/* Alert Banner */}
        {risk.level === 'High' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-red-900/30 border border-red-600/50 rounded-2xl p-4"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle size={24} className="text-red-400" />
              <div>
                <h3 className="text-red-400 font-semibold">Portfolio Risk Alert</h3>
                <p className="text-gray-300">Your portfolio is overexposed to volatile tokens. Consider diversifying.</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Portfolio Value</p>
                    <p className="text-2xl font-bold text-white">
                      ${userProfile.portfolioValue.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign size={24} className="text-green-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Diversification</p>
                    <p className="text-2xl font-bold text-white">{userProfile.diversificationScore}%</p>
                  </div>
                  <PieChart size={24} className="text-blue-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Risk Level</p>
                    <p className={`text-2xl font-bold ${risk.color}`}>{risk.level}</p>
                  </div>
                  <div className={`w-3 h-3 ${risk.bg} rounded-full`}></div>
                </div>
              </motion.div>
            </div>

            {/* Portfolio Allocation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Portfolio Allocation</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${value}%`, 'Allocation']}
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-white font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - NFT Badge */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6 text-center">Your Reputation NFT</h3>
              <div className="flex justify-center mb-6">
                <NFTBadge investor={userProfile} size="large" />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">NFT ID</span>
                  <span className="text-white">#{userProfile.id.padStart(4, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white">{userProfile.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Score</span>
                  <span className="text-yellow-400 font-semibold">{userProfile.score}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Updated</span>
                  <span className="text-white text-sm">
                    {userProfile.lastUpdated.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <motion.button
                onClick={handleUpdateNFT}
                disabled={isUpdatingNFT}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2"
              >
                {isUpdatingNFT ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    <span>Updating NFT...</span>
                  </>
                ) : updateSuccess ? (
                  <>
                    <CheckCircle size={18} />
                    <span>NFT Updated!</span>
                  </>
                ) : (
                  <>
                    <RefreshCw size={18} />
                    <span>Update NFT Metadata</span>
                  </>
                )}
              </motion.button>
              
              <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                <h4 className="text-white font-semibold mb-2 text-sm">Update Process:</h4>
                <div className="space-y-1 text-xs text-gray-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Analyze current portfolio</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Calculate new reputation score</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Update NFT metadata on-chain</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <TrendingUp size={16} className="text-green-400" />
                  <span className="text-gray-300">Score increased to {userProfile.score}</span>
                  <span className="text-gray-500">2h ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Award size={16} className="text-yellow-400" />
                  <span className="text-gray-300">NFT metadata updated</span>
                  <span className="text-gray-500">1d ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <PieChart size={16} className="text-blue-400" />
                  <span className="text-gray-300">Portfolio rebalanced</span>
                  <span className="text-gray-500">3d ago</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};