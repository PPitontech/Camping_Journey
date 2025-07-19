"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Schema for Product
const ProductSchema = new mongoose_1.Schema({
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
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
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
}, { timestamps: true });
// Create text index for search functionality
ProductSchema.index({
    name: 'text',
    description: 'text',
    shortDescription: 'text',
    tags: 'text',
    'seo.keywords': 'text'
});
// Create compound index for filtering
ProductSchema.index({ category: 1, active: 1 });
ProductSchema.index({ featured: 1, active: 1 });
ProductSchema.index({ price: 1 });
exports.default = mongoose_1.default.model('Product', ProductSchema);
//# sourceMappingURL=Product.js.map