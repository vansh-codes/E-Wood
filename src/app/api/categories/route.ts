import { NextResponse } from 'next/server'

const categories = [
  { name: 'Hardwood', description: 'Premium hardwood varieties', image: '/hardwood.png' },
  { name: 'Softwood', description: 'Versatile softwood options', image: '/softwood.png' },
  { name: 'Exotic Wood', description: 'Unique and rare wood species', image: '/exotic.png' },
]

export async function GET() {
  return NextResponse.json(categories)
}
