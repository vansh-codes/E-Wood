'use client'
import mongoose, { Document, Model, Schema } from 'mongoose'

interface ITestimonials extends Document {
  name: string
  username: string
  body: string
  img: string
}

const ReviewSchema: Schema<ITestimonials> = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    body: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
)

const Testimonials: Model<ITestimonials> =
  mongoose.models.Testimonials || mongoose.model<ITestimonials>('Testimonials', ReviewSchema)

export default Testimonials
