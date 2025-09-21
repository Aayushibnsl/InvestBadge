import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Eye, UserPlus, Filter, X, TrendingUp, TrendingDown, Activity, Calendar, DollarSign, PieChart } from 'lucide-react';
import { NFTBadge } from './NFTBadge';
import { mockInvestors } from '../utils/mockData';
import { shortenAddress } from '../utils/web3';
import { InvestorProfile } from '../types';

export const Leaderboard: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Risk-averse' | 'Balanced' | 'Aggressive'>('all');
  const [followedInvestors, setFollowedInvestors] = useState<Set<string>>(new Set());
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorProfile | null>(null);
  const [showFollowModal, setShowFollowModal] = useState(false);

  const filteredInvestors = mockInvestors
    .filter(investor => filter === 'all' || investor.type === filter)
    .sort((a, b) => b.score - a.score);

  const handleFollow = (investorId: string) => {
    const newFollowed = new Set(followedInvestors);
    if (newFollowed.has(investorId)) {
      newFollowed.delete(investorId);
    } else {
      newFollowed.add(investorId);
    }
    setFollowedInvestors(newFollowed);
    
    // Show follow confirmation modal
    if (!newFollowed.has(investorId)) {
      // Just unfollowed
    } else {
      // Just followed - show modal with investor details
      const investor = mockInvestors.find(i => i.id === investorId);
      if (investor) {
        setSelectedInvestor(investor);
        setShowFollowModal(true);
      }
    }
  };

  const handleViewDetails = (investor: InvestorProfile) => {
    setSelectedInvestor(investor);
  };

  const closeModal = () => {
    setSelectedInvestor(null);
    setShowFollowModal(false);
  };

  // Mock detailed data for selected investor
  const getInvestorDetails = (investor: InvestorProfile) => {
    return {
      totalTrades: Math.floor(Math.random() * 500) + 100,
      winRate: Math.floor(Math.random() * 40) + 60, // 60-100%
      avgHoldTime: Math.floor(Math.random() * 30) + 5, // 5-35 days
      bestTrade: Math.floor(Math.random() * 500) + 100, // % gain
      worstTrade: -(Math.floor(Math.random() * 50) + 10), // % loss
      monthlyReturn: Math.floor(Math.random() * 30) + 5, // 5-35%
      followers: Math.floor(Math.random() * 1000) + 50,
      topHoldings: [
        { symbol: 'BTC', percentage: 35, value: investor.portfolioValue * 0.35 },
        { symbol: 'ETH', percentage: 25, value: investor.portfolioValue * 0.25 },
        { symbol: 'USDC', percentage: 20, value: investor.portfolioValue * 0.20 },
        { symbol: 'LINK', percentage: 12, value: investor.portfolioValue * 0.12 },
        { symbol: 'UNI', percentage: 8, value: investor.portfolioValue * 0.08 },
      ],
      recentTrades: [
        { token: 'AAVE', action: 'BUY', amount: '$5,200', time: '2h ago', pnl: '+12.5%' },
        { token: 'SOL', action: 'SELL', amount: '$8,100', time: '1d ago', pnl: '+8.2%' },
        { token: 'MATIC', action: 'BUY', amount: '$3,400', time: '2d ago', pnl: '-2.1%' },
        { token: 'DOT', action: 'SELL', amount: '$6,700', time: '3d ago', pnl: '+15.8%' },
      ]
    };
  };
  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const filters = [
    { key: 'all', label: 'All Investors', count: mockInvestors.length },
    { key: 'Risk-averse', label: 'Risk-averse', count: mockInvestors.filter(i => i.type === 'Risk-averse').length },
    { key: 'Balanced', label: 'Balanced', count: mockInvestors.filter(i => i.type === 'Balanced').length },
    { key: 'Aggressive', label: 'Aggressive', count: mockInvestors.filter(i => i.type === 'Aggressive').length },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            <Trophy className="inline-block mr-3 text-yellow-400" size={40} />
            Investor Leaderboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the top-performing investors in our community and learn from their strategies.
            Follow high-reputation wallets to track their moves.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gray-800 rounded-2xl p-6 text-center">
            <Users size={32} className="text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{mockInvestors.length}</div>
            <div className="text-gray-400">Total Investors</div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 text-center">
            <Trophy size={32} className="text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{Math.max(...mockInvestors.map(i => i.score))}</div>
            <div className="text-gray-400">Highest Score</div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-white">
              ${Math.round(mockInvestors.reduce((sum, i) => sum + i.portfolioValue, 0) / 1000)}K
            </div>
            <div className="text-gray-400">Avg Portfolio</div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-white">{followedInvestors.size}</div>
            <div className="text-gray-400">Following</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Filter size={20} className="text-gray-400" />
            <span className="text-gray-400 font-medium">Filter by investor type:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filterOption) => (
              <motion.button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  filter === filterOption.key
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterOption.label} ({filterOption.count})
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredInvestors.map((investor, index) => (
            <motion.div
              key={investor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-colors group"
            >
              <div className="flex items-start space-x-4">
                {/* Rank */}
                <div className="text-center min-w-12">
                  <div className="text-2xl mb-2">{getRankIcon(index)}</div>
                  <div className="text-xs text-gray-400">Rank</div>
                </div>

                {/* NFT Badge */}
                <div className="flex-shrink-0">
                  <NFTBadge investor={investor} size="small" showDetails={false} />
                </div>

                {/* Investor Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {shortenAddress(investor.address)}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                        <span>{investor.type}</span>
                        <span>Score: {investor.score}</span>
                        <span>${(investor.portfolioValue / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">{investor.score}</div>
                      <div className="text-xs text-gray-400">out of 100</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-400">Portfolio Value</div>
                      <div className="text-white font-semibold">
                        ${investor.portfolioValue.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Diversification</div>
                      <div className="text-white font-semibold">{investor.diversificationScore}%</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={() => handleFollow(investor.id)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        followedInvestors.has(investor.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <UserPlus size={14} />
                      <span>{followedInvestors.has(investor.id) ? 'Following' : 'Follow'}</span>
                    </motion.button>
                    <motion.button
                      className="flex items-center space-x-1 px-3 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                     onClick={() => handleViewDetails(investor)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredInvestors.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-lg">No investors found for the selected filter.</div>
          </motion.div>
        )}
      </div>

      {/* Follow Success Modal */}
      {showFollowModal && selectedInvestor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Successfully Following!</h3>
              <p className="text-gray-300 mb-4">
                You're now following {shortenAddress(selectedInvestor.address)}
              </p>
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Reputation Score:</span>
                  <span className="text-yellow-400 font-semibold">{selectedInvestor.score}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-400">Investor Type:</span>
                  <span className="text-white">{selectedInvestor.type}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-400">Portfolio Value:</span>
                  <span className="text-white">${selectedInvestor.portfolioValue.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Investor Details Modal */}
      {selectedInvestor && !showFollowModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <NFTBadge investor={selectedInvestor} size="small" showDetails={false} />
                <div>
                  <h2 className="text-2xl font-bold text-white">{shortenAddress(selectedInvestor.address)}</h2>
                  <p className="text-gray-400">{selectedInvestor.type} Investor</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {(() => {
              const details = getInvestorDetails(selectedInvestor);
              return (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Performance Stats */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Activity size={16} className="text-blue-400" />
                          <span className="text-gray-400 text-sm">Total Trades</span>
                        </div>
                        <div className="text-xl font-bold text-white">{details.totalTrades}</div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp size={16} className="text-green-400" />
                          <span className="text-gray-400 text-sm">Win Rate</span>
                        </div>
                        <div className="text-xl font-bold text-green-400">{details.winRate}%</div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar size={16} className="text-yellow-400" />
                          <span className="text-gray-400 text-sm">Avg Hold</span>
                        </div>
                        <div className="text-xl font-bold text-white">{details.avgHoldTime}d</div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users size={16} className="text-purple-400" />
                          <span className="text-gray-400 text-sm">Followers</span>
                        </div>
                        <div className="text-xl font-bold text-white">{details.followers}</div>
                      </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Trading Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Best Trade:</span>
                          <span className="text-green-400 font-semibold">+{details.bestTrade}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Worst Trade:</span>
                          <span className="text-red-400 font-semibold">{details.worstTrade}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Monthly Return:</span>
                          <span className="text-yellow-400 font-semibold">+{details.monthlyReturn}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Holdings & Recent Activity */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Portfolio Holdings</h3>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Top Holdings</h4>
                      <div className="space-y-3">
                        {details.topHoldings.map((holding, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">{holding.symbol}</span>
                              </div>
                              <span className="text-white">{holding.symbol}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-semibold">{holding.percentage}%</div>
                              <div className="text-gray-400 text-sm">${holding.value.toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Recent Trades</h4>
                      <div className="space-y-3">
                        {details.recentTrades.map((trade, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                trade.action === 'BUY' ? 'bg-green-600' : 'bg-red-600'
                              }`}>
                                {trade.action === 'BUY' ? (
                                  <TrendingUp size={12} className="text-white" />
                                ) : (
                                  <TrendingDown size={12} className="text-white" />
                                )}
                              </div>
                              <div>
                                <div className="text-white font-medium">{trade.action} {trade.token}</div>
                                <div className="text-gray-400 text-sm">{trade.time}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white">{trade.amount}</div>
                              <div className={`text-sm font-semibold ${
                                trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {trade.pnl}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
            <div className="flex space-x-4 mt-6 pt-6 border-t border-gray-700">
              <motion.button
                onClick={() => handleFollow(selectedInvestor.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  followedInvestors.has(selectedInvestor.id)
                    ? 'bg-green-600 text-white'
                    : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus size={18} />
                <span>{followedInvestors.has(selectedInvestor.id) ? 'Following' : 'Follow Investor'}</span>
              </motion.button>
              
              <motion.button
                onClick={closeModal}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};