export interface Product {
  productID: number;
  productName: string;
  productImageName: string;
  description: string;
  category: 'Coins' | 'Furniture' | 'Jewellery' | 'Art' | string;
  minPrice: number;
  maxPrice: number;
  startTime: string;
  endTime: string;
  latestBid: number;
  userID: string;
  userName: string;
  bids?: Bid[];
  isFeatured?: boolean;
}

export interface Bid {
  bidID: number;
  productID: number;
  userID: string;
  userName: string;
  bidAmount: number;
  timestamp: string;
  productName?: string;
  productImageName?: string;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'Auctioneer' | 'User';
  profilePictureUrl?: string;
}

export interface UserActivity {
  id: number;
  userId: string;
  userName: string;
  action: string;
  data: string;
  activityDate: string;
}

export interface DashboardStats {
  products_count: number;
  bids_count: number;
  users_count: number;
  userActivity_count: number;
  coins_count: number;
  furniture_count: number;
  jewellery_count: number;
  art_count: number;
  coins_BidCount: number;
  furniture_BidCount: number;
  jewellery_BidCount: number;
  art_BidCount: number;
  monthlyActivities: { month: string; count: number }[];
}
