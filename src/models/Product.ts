export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  currency: 'MXN' | 'USD';
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  sku: string;
  stock: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  tags?: string[];
  featured: boolean;
  active: boolean;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    validFrom: Date;
    validTo: Date;
  };
  specifications?: {
    [key: string]: string;
  };
  createdAt: Date;
  updatedAt: Date;
} 