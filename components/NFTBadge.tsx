import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Shield, Zap } from 'lucide-react';
import { InvestorProfile } from '../types';

interface NFTBadgeProps {
  investor: InvestorProfile;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

export const NFTBadge: React.FC<NFTBadgeProps> = ({ 
  investor, 
  size = 'medium', 
  showDetails = true 
}) => {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'Risk-averse':
        return {
          bg: 'from-blue-600 to-blue-800',
          icon: Shield,
          color: 'text-blue-300',
          glow: 'shadow-blue-500/20',
        };
      case 'Balanced':
        return {
          bg: 'from-yellow-600 to-yellow-800',
          icon: TrendingUp,
          color: 'text-yellow-300',
          glow: 'shadow-yellow-500/20',
        };
      case 'Aggressive':
        return {
          bg: 'from-red-600 to-red-800',
          icon: Zap,
          color: 'text-red-300',
          glow: 'shadow-red-500/20',
        };
      default:
        return {
          bg: 'from-gray-600 to-gray-800',
          icon: Trophy,
          color: 'text-gray-300',
          glow: 'shadow-gray-500/20',
        };
    }
  };

  const sizeConfig = {
    small: { width: 'w-24', height: 'h-32', iconSize: 16 },
    medium: { width: 'w-32', height: 'h-40', iconSize: 20 },
    large: { width: 'w-48', height: 'h-56', iconSize: 24 },
  };

  const config = getTypeConfig(investor.type);
  const Icon = config.icon;
  const sizes = sizeConfig[size];

  return (
    <motion.div
      className={`${sizes.width} ${sizes.height} relative`}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className={`w-full h-full bg-gradient-to-br ${config.bg} rounded-2xl shadow-xl ${config.glow} relative overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
          <div className="absolute top-2 right-2 w-8 h-8 border border-white/30 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border border-white/30 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <Icon size={sizes.iconSize} className="text-white/80" />
            <div className="text-right">
              <div className="text-xs text-white/60">SCORE</div>
              <div className="text-lg font-bold text-white">{investor.score}</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-white font-semibold text-sm mb-1">
              #{investor.id.padStart(4, '0')}
            </div>
            <div className={`text-xs ${config.color} font-medium`}>
              {investor.type.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Glow Effect for High Scores */}
        {investor.score >= 90 && (
          <motion.div
            className="absolute inset-0 border-2 border-yellow-400/50 rounded-2xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {showDetails && size !== 'small' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center"
        >
          <div className="text-xs text-gray-400">
            Last Updated: {new Date(investor.lastUpdated).toLocaleDateString()}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};