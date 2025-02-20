export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string[]
  rating: number
  discount: number
  featured: boolean
}

export interface FilterState {
  minPrice: number
  maxPrice: number
  rating: string
  search: string
}

export interface ProductListProps {
  initialProducts: Product[]
}
