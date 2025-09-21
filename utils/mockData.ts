import { InvestorProfile, PortfolioData } from '../types';

export const mockInvestors: InvestorProfile[] = [
  {
    id: '1',
    address: '0x1234567890123456789012345678901234567890',
    score: 95,
    type: 'Balanced',
    portfolioValue: 250000,
    diversificationScore: 85,
    lastUpdated: new Date(),
  },
  {
    id: '2',
    address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    score: 88,
    type: 'Risk-averse',
    portfolioValue: 180000,
    diversificationScore: 92,
    lastUpdated: new Date(),
  },
  {
    id: '3',
    address: '0x9876543210987654321098765432109876543210',
    score: 76,
    type: 'Aggressive',
    portfolioValue: 320000,
    diversificationScore: 65,
    lastUpdated: new Date(),
  },
  {
    id: '4',
    address: '0xfedcbafedcbafedcbafedcbafedcbafedcbafedcba',
    score: 82,
    type: 'Balanced',
    portfolioValue: 145000,
    diversificationScore: 78,
    lastUpdated: new Date(),
  },
  {
    id: '5',
    address: '0x5555555555555555555555555555555555555555',
    score: 91,
    type: 'Risk-averse',
    portfolioValue: 420000,
    diversificationScore: 89,
    lastUpdated: new Date(),
  },
];

export const mockPortfolioData: PortfolioData = {
  stablecoins: 35,
  bitcoin: 25,
  altcoins: 30,
  defi: 10,
};

export const calculateInvestorType = (portfolioData: PortfolioData): 'Risk-averse' | 'Balanced' | 'Aggressive' => {
  const riskScore = portfolioData.altcoins + portfolioData.defi;
  
  if (riskScore <= 30) return 'Risk-averse';
  if (riskScore <= 60) return 'Balanced';
  return 'Aggressive';
};

export const calculateReputationScore = (portfolioData: PortfolioData): number => {
  // Mock calculation based on diversification and risk management
  const diversificationBonus = Math.min(25, Object.values(portfolioData).filter(v => v > 0).length * 6.25);
  const riskPenalty = Math.max(0, (portfolioData.altcoins + portfolioData.defi - 50) * 0.5);
  const baseScore = 70;
  
  return Math.round(Math.min(100, Math.max(0, baseScore + diversificationBonus - riskPenalty)));
};