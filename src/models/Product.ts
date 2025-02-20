// models/Product.ts
import mongoose, { Document, Model, Schema } from 'mongoose'

interface IReview {
  user: string
  rating: number
  comment: string
}

export interface IProduct extends Document {
  name: string
  category: string
  price: number
  discount: number
  images: string[]
  description: string
  specifications: {
    length: string
    width: string
    thickness: string
    grade: string
  }
  stock: number
  quantity: number
  featured: boolean
  rating: number
  reviews: IReview[]
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    images: { type: [String], required: true },
    description: { type: String, required: true },
    specifications: {
      length: { type: String, required: true },
      width: { type: String, required: true },
      thickness: { type: String, required: true },
      grade: { type: String, required: true },
    },
    stock: { type: Number, required: true },
    quantity: { type: Number, required: true },
    featured: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    reviews: [
      {
        user: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export default Product
