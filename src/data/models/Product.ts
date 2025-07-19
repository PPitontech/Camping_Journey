import mongoose, { Document, Schema } from 'mongoose';

// Interface for Product document
export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  sku: string;
  barcode?: string;
  weight: number; // in grams
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  images: string[];
  thumbnailImage: string;
  category: mongoose.Types.ObjectId;
  tags: string[];
  inventory: {
    quantity: number;
    unlimited: boolean;
    lowStockThreshold?: number;
  };
  supplier: {
    name: string;
    id: string;
    url?: string;
    processingTime?: string;
  };
  shipping: {
    freeShipping: boolean;
    shippingWeight?: number;
    shippingTime?: string;
    originCountry: string;
  };
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for Product
const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    costPrice: { type: Number },
    sku: { type: String, required: true, unique: true },
    barcode: { type: String },
    weight: { type: Number, required: true }, // in grams
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
    images: [{ type: String }],
    thumbnailImage: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: String }],
    inventory: {
      quantity: { type: Number, default: 0 },
      unlimited: { type: Boolean, default: false },
      lowStockThreshold: { type: Number },
    },
    supplier: {
      name: { type: String, required: true },
      id: { type: String, required: true },
      url: { type: String },
      processingTime: { type: String },
    },
    shipping: {
      freeShipping: { type: Boolean, default: false },
      shippingWeight: { type: Number },
      shippingTime: { type: String },
      originCountry: { type: String, required: true },
    },
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Create text index for search functionality
ProductSchema.index(
  { 
    name: 'text', 
    description: 'text', 
    shortDescription: 'text',
    tags: 'text',
    'seo.keywords': 'text'
  }
);

// Create compound index for filtering
ProductSchema.index({ category: 1, active: 1 });
ProductSchema.index({ featured: 1, active: 1 });
ProductSchema.index({ price: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
