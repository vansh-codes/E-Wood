'use strict'

import { NextResponse } from 'next/server'
import Product from '@/models/Product'
import dbConnect from '@/lib/dbConnect'
import { z } from 'zod'
import { FilterQuery, SortOrder } from 'mongoose'

/* export async function GET(req: Request) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const batch = searchParams.get("batch");

    if (id) {
        const product = await Product.findById(id);
        if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        return NextResponse.json(product);
    }

    if (batch) {
        const limit = parseInt(batch) || 10;
        const products = await Product.find().limit(limit);
        return NextResponse.json(products);
    }

    const products = await Product.find();
    return NextResponse.json(products);
} */

const querySchema = z.object({
  id: z.string().optional(),
  batch: z.string().transform(Number).optional(),
  category: z.string().optional(),
  minPrice: z.string().transform(Number).optional(),
  maxPrice: z.string().transform(Number).optional(),
  rating: z.string().transform(Number).optional(),
  search: z.string().optional(),
  sort: z.enum(['featured', 'priceLowToHigh', 'priceHighToLow', 'rating']).optional(),
})

interface IProduct {
  _id: string
  name: string
  category: string
  price: number
  rating: number
  featured: boolean
}

export async function GET(req: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(req.url)
    const params = Object.fromEntries(searchParams.entries())

    // Validate query parameters
    const validatedQuery = querySchema.safeParse(params)
    if (!validatedQuery.success) {
      return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 })
    }

    const { id, batch, category, minPrice, maxPrice, rating, search, sort } = validatedQuery.data

    // Handle single product fetch
    if (id) {
      const product = await Product.findById(id)
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      return NextResponse.json(product)
    }

    // Build query
    const mongoQuery: FilterQuery<IProduct> = {}

    if (category && category !== 'All') mongoQuery.category = category
    if (minPrice || maxPrice) {
      mongoQuery.price = {}
      if (minPrice) mongoQuery.price.$gte = minPrice
      if (maxPrice) mongoQuery.price.$lte = maxPrice
    }
    if (rating) mongoQuery.rating = { $gte: rating }
    if (search) mongoQuery.name = { $regex: search, $options: 'i' }

    // Build sort
    const sortQuery: Record<string, SortOrder> = {}
    switch (sort) {
      case 'priceLowToHigh':
        sortQuery.price = 1
        break
      case 'priceHighToLow':
        sortQuery.price = -1
        break
      case 'rating':
        sortQuery.rating = -1
        break
      default:
        sortQuery.featured = -1
    }

    // Execute query
    let productsQuery = Product.find(mongoQuery).sort(sortQuery)

    if (batch) {
      productsQuery = productsQuery.limit(batch)
    }

    const products = await productsQuery.exec()

    return NextResponse.json(products)
  } catch (error) {
    console.error('Products API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  await dbConnect()

  try {
    const body = await req.json()
    const product = new Product(body)
    await product.save()

    return NextResponse.json(product, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 400 })
  }
}

export async function DELETE(req: Request) {
  await dbConnect()

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
  }

  await Product.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 })
}

export async function PATCH(req: Request) {
  await dbConnect()

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
  }

  try {
    const updates = await req.json()
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true })

    if (!updatedProduct) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    return NextResponse.json(updatedProduct)
  } catch {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 400 })
  }
}
