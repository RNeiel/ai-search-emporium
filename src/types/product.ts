export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  confidence?: number;
  isAIRecommended?: boolean;
  benefits?: string[];
}

export interface ProductScenario {
  title: string;
  description: string;
  performance: string;
  icon: string;
}

export interface ProductSpecs {
  [key: string]: string;
}