export interface InvestorProfile {
  id: string;
  address: string;
  score: number;
  type: 'Risk-averse' | 'Balanced' | 'Aggressive';
  nftId?: string;
  portfolioValue: number;
  diversificationScore: number;
  lastUpdated: Date;
  isFollowing?: boolean;
}

export interface PortfolioData {
  stablecoins: number;
  bitcoin: number;
  altcoins: number;
  defi: number;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}