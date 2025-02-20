import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Testimonials from '@/models/Testimonials'

export const runtime = 'edge'

export async function GET() {
  await dbConnect()
  const testimonials = await Testimonials.find({})
  return NextResponse.json(testimonials)
}

export async function POST(request: NextRequest) {
  await dbConnect()
  const data = await request.json()
  const newTestimonial = new Testimonials(data)
  await newTestimonial.save()
  return NextResponse.json(newTestimonial, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  await Testimonials.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Testimonials deleted' })
}

export async function PATCH(request: NextRequest) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  const data = await request.json()
  const updatedReview = await Testimonials.findByIdAndUpdate(id, data, { new: true })
  return NextResponse.json(updatedReview)
}
