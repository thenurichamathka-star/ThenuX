export type ScreenType = 'dashboard' | 'feed' | 'marketplace' | 'map';

export type PresentationMode = 'phone' | 'dribbble' | 'design-system';

export interface UserProfile {
  name: string;
  handle: string;
  location: string;
  avatarInitials: string;
  tier: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  seedBalance: number;
  activeStreak: number;
  treesPlanted: number;
  treesGoal: number;
  wasteDivertedKg: number;
  wasteGoal: number;
  co2SavedKg: number;
  co2Goal: number;
}

export interface HabitStep {
  id: string;
  key: 'refuse' | 'upcycle' | 'swap' | 'compost';
  title: string;
  action: string;
  icon: string;
  completed: boolean;
  seeds: number;
}

export interface FeedComment {
  id: string;
  author: string;
  handle: string;
  text: string;
  timeAgo: string;
}

export interface FeedPost {
  id: string;
  author: string;
  handle: string;
  location: string;
  category: 'cleanup' | 'upcycle' | 'trees' | 'diy';
  timeAgo: string;
  title: string;
  caption: string;
  badge: string;
  badgeType: 'forest' | 'terracotta' | 'sage' | 'lime';
  visualType: 'cleanup_beach' | 'upcycle_denim' | 'seedling_terrace' | 'custom';
  stats: { label: string; value: string; icon: string }[];
  highSprouts: number;
  userLiked: boolean;
  commentsCount: number;
  comments: FeedComment[];
  seedReward: number;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  maker: string;
  makerHandle: string;
  location: string;
  priceLkr: number;
  seedPrice: number;
  category: 'fashion' | 'home' | 'plants' | 'beauty' | 'gear';
  badges: string[];
  impactSummary: string;
  description: string;
  makerStory: string;
  visualType: 'denim_tote' | 'coconut_bowl' | 'monstera_node' | 'shampoo_bar' | 'tube_wallet';
  condition: '100% Upcycled' | 'Zero Waste' | 'Living Plant' | 'Plastic-Free' | 'Repurposed';
  co2SavedKg: number;
  wasteSavedKg: number;
  inStock: boolean;
}

export interface ColomboProject {
  id: string;
  name: string;
  locationName: string;
  neighborhood: string;
  category: 'cleanup' | 'planting' | 'wetland' | 'depot';
  coords: { x: number; y: number }; // percentage on vector map
  date: string;
  time: string;
  attendeesCount: number;
  targetMetric: string;
  targetValue: string;
  seedReward: number;
  description: string;
  partner: string;
  userRsvpd: boolean;
  highlights: string[];
  meetingPoint: string;
}
