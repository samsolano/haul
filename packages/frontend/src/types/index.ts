export interface ThriftFind {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  location: string;
  createdAt: string;
}

export interface ThriftStore {
  id: string;
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
}

export interface UserProfile {
  username: string;
  avatar?: string;
  bio?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  finds: ThriftFind[];
  savedStores: ThriftStore[];
}
