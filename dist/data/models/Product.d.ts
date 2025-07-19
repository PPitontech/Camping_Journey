import mongoose, { Document } from 'mongoose';
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
    weight: number;
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
declare const _default: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct, {}> & IProduct & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
