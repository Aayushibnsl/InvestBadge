import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Shield, TrendingUp, Zap, Wallet, Star, ArrowRight } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { connect, isConnecting, isConnected } = useWallet();

  const handleGetStarted = async () => {
    if (!isConnected) {
      await connect();
    }
    onNavigate('dashboard');
  };

  const features = [
    {
      icon: Trophy,
      title: 'Reputation NFTs',
      description: 'Earn dynamic, non-transferable badges that reflect your investment performance',
      color: 'text-yellow-400',
    },
    {
      icon: Shield,
      title: 'On-Chain Proof',
      description: 'All calculations are transparent and verifiable on the blockchain',
      color: 'text-blue-400',
    },
    {
      icon: TrendingUp,
      title: 'Performance Tracking',
      description: 'Real-time updates based on your portfolio performance and risk management',
      color: 'text-green-400',
    },
    {
      icon: Star,
      title: 'Leaderboards',
      description: 'Compete with other investors and showcase your trading expertise',
      color: 'text-purple-400',
    },
  ];

  const investorTypes = [
    {
      type: 'Risk-averse',
      icon: Shield,
      color: 'from-blue-600 to-blue-800',
      description: 'Conservative investors focused on stability',
    },
    {
      type: 'Balanced',
      icon: TrendingUp,
      color: 'from-yellow-600 to-yellow-800',
      description: 'Strategic investors with diversified portfolios',
    },
    {
      type: 'Aggressive',
      icon: Zap,
      color: 'from-red-600 to-red-800',
      description: 'High-risk, high-reward investment strategies',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Earn Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Reputation Badge
              </span>
              <br />
              as an Investor
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              The first Web3 platform where every investor earns a non-transferable Reputation NFT 
              that dynamically updates with their performance score. Build trust, showcase expertise, 
              and discover top performers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={handleGetStarted}
                disabled={isConnecting}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg shadow-yellow-500/25 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wallet size={24} />
                <span>{isConnecting ? 'Connecting...' : isConnected ? 'Go to Dashboard' : 'Connect Wallet'}</span>
                <ArrowRight size={24} />
              </motion.button>

              <motion.button
                onClick={() => onNavigate('leaderboard')}
                className="flex items-center justify-center space-x-2 border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trophy size={24} />
                <span>View Leaderboard</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Floating NFT Badges */}
        <div className="absolute top-20 right-10 opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl"
          />
        </div>
        <div className="absolute bottom-20 left-10 opacity-20">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-24 h-32 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-2xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform analyzes your on-chain investment history and awards you with 
              a dynamic reputation score that updates in real-time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-900 p-8 rounded-2xl hover:bg-gray-850 transition-colors"
                >
                  <div className={`w-12 h-12 ${feature.color} bg-opacity-20 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={24} className={feature.color} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investor Types Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Investor Types</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your NFT badge reflects your investment strategy and risk tolerance, 
              helping others understand your approach to the markets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {investorTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.type}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-32 h-40 bg-gradient-to-br ${type.color} rounded-2xl mx-auto mb-6 shadow-xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <div className="relative z-10 h-full flex flex-col justify-between p-4">
                      <Icon size={24} className="text-white/80 mx-auto" />
                      <div>
                        <div className="text-white font-semibold text-sm mb-1">#0001</div>
                        <div className="text-xs text-white/80 font-medium">
                          {type.type.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{type.type}</h3>
                  <p className="text-gray-400">{type.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-yellow-600/10 to-yellow-800/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Your Reputation?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the future of investor verification and start earning your reputation today.
            </p>
            <motion.button
              onClick={handleGetStarted}
              disabled={isConnecting}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg shadow-yellow-500/25 disabled:opacity-50 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Wallet size={24} />
              <span>{isConnecting ? 'Connecting...' : isConnected ? 'Go to Dashboard' : 'Get Started Now'}</span>
              <ArrowRight size={24} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};