import mongoose, { Document, Schema } from 'mongoose';

// Interface for Category document
export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategory?: mongoose.Types.ObjectId;
  featured: boolean;
  active: boolean;
  order: number;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// Schema for Category
const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

// Create text index for search functionality
CategorySchema.index({ name: 'text', description: 'text' });

// Create compound index for filtering
CategorySchema.index({ parentCategory: 1, active: 1 });
CategorySchema.index({ featured: 1, active: 1 });
CategorySchema.index({ order: 1 });

export default mongoose.model<ICategory>('Category', CategorySchema);
