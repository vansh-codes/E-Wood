"use client"

import { Suspense, useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ShoppingCart, Heart, Star, Filter, X, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import productsData from '@/data/products.json'
import { useStore } from '@/context/StoreContext'
import { SearchCategory } from '@/components/SearchCategory'

const PRODUCTS_PER_PAGE = 5

export default function Products() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_PAGE)
  const [loading, setLoading] = useState(false)
  const [priceRange, setPriceRange] = useState([99, 15000])
  const [selectedRating, setSelectedRating] = useState<string>("")
  const [sortBy, setSortBy] = useState("featured")
  const [isFilterActive, setIsFilterActive] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [pendingFilters, setPendingFilters] = useState({
    // category: "All",
    minPrice: 99,
    maxPrice: 15000,
    rating: "",
    // sort: "featured",
    search: ""
  })

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  })

  const { addToCart, addToWishlist, removeFromCart, removeFromWishlist, cartItems, wishlistItems } = useStore()

  useEffect(() => {
    const category = searchParams?.get('category') || "All"
    const minPrice = searchParams?.get('minPrice') || "99"
    const maxPrice = searchParams?.get('maxPrice') || "15000"
    const rating = searchParams?.get('rating') || ""
    const sort = searchParams?.get('sort') || "featured"
    const search = searchParams?.get('search') || ""

    setSelectedCategory(category)
    setPriceRange([parseInt(minPrice), parseInt(maxPrice)])
    setSelectedRating(rating)
    setSortBy(sort)
    setSearchTerm(search)

    setPendingFilters({
      // category,
      minPrice: parseInt(minPrice),
      maxPrice: parseInt(maxPrice),
      rating,
      // sort,
      search
    })

    setIsFilterActive(
      // category !== "All" ||
      minPrice !== "99" ||
      maxPrice !== "15000" ||
      rating !== "" ||
      // sort !== "featured" ||
      search !== ""
    )

    setVisibleProducts(PRODUCTS_PER_PAGE)
    window.scrollTo({ top: 0 })
  }, [searchParams])

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true)
      setTimeout(() => {
        setVisibleProducts((prev) => prev + PRODUCTS_PER_PAGE)
        setLoading(false)
      }, 500)
    }
  }, [inView, loading])

  const filteredProducts = useMemo(() =>
    productsData.products
      .filter(product =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] && product.price <= priceRange[1] &&
        (selectedRating === "" || Math.floor(product.rating) === parseInt(selectedRating))
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "priceLowToHigh":
            return a.price - b.price
          case "priceHighToLow":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          default:
            return b.featured ? 1 : -1
        }
      })
      .slice(0, visibleProducts),
    [selectedCategory, searchTerm, visibleProducts, priceRange, selectedRating, sortBy]
  )

  const isInCart = useCallback((productId: number) => cartItems.some(item => item.id === productId), [cartItems])
  const isInWishlist = useCallback((productId: number) => wishlistItems.some(item => item.id === productId), [wishlistItems])

  const applyFilters = () => {
    // setSelectedCategory(pendingFilters.category)
    setPriceRange([pendingFilters.minPrice, pendingFilters.maxPrice])
    setSelectedRating(pendingFilters.rating)
    // setSortBy(pendingFilters.sort)
    setSearchTerm(pendingFilters.search)

    const params = new URLSearchParams()
    // if (pendingFilters.category !== "All") params.set('category', pendingFilters.category)
    if (pendingFilters.minPrice !== 99) params.set('minPrice', pendingFilters.minPrice.toString())
    if (pendingFilters.maxPrice !== 15000) params.set('maxPrice', pendingFilters.maxPrice.toString())
    if (pendingFilters.rating !== "") params.set('rating', pendingFilters.rating)
    // if (pendingFilters.sort !== "featured") params.set('sort', pendingFilters.sort)
    if (pendingFilters.search !== "") params.set('search', pendingFilters.search)

    router.push(`/products?${params.toString()}`, { scroll: false })
    setIsSheetOpen(false)
  }

  const clearFilters = () => {
    const newPendingFilters = {
      category: "All",
      minPrice: 99,
      maxPrice: 15000,
      rating: "",
      sort: "featured",
      search: ""
    }
    setPendingFilters(newPendingFilters)
    setSelectedCategory("All")
    setPriceRange([99, 15000])
    setSelectedRating("")
    setSortBy("featured")
    setSearchTerm("")
    router.push('/products', { scroll: false })
    setIsSheetOpen(false)
  }

  const removeFilter = (key: string) => {
    const newPendingFilters = { ...pendingFilters }
    switch (key) {
/*       case 'category':
        newPendingFilters.category = "All"
        setSelectedCategory("All")
        break */
      case 'price':
        newPendingFilters.minPrice = 99
        newPendingFilters.maxPrice = 15000
        setPriceRange([99, 15000])
        break
      case 'rating':
        newPendingFilters.rating = ""
        setSelectedRating("")
        break
/*       case 'sort':
        newPendingFilters.sort = "featured"
        setSortBy("featured")
        break */
      case 'search':
        newPendingFilters.search = ""
        setSearchTerm("")
        break
    }
    setPendingFilters(newPendingFilters)

    const params = new URLSearchParams(searchParams?.toString())
    params.delete(key)
    if (key === 'price') {
      params.delete('minPrice')
      params.delete('maxPrice')
    }
    router.push(`/products?${params.toString()}`, { scroll: false })
  }

  return (
    <Suspense fallback={
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-24 h-24 animate-spin" />
    </div>
  }>
      {/* <div className="min-h-screen bg-[url('/wood-texture-light.png')] dark:bg-[url('/wood-texture-dark.png')] bg-contain"> */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Wood Products</h1>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64"
            />
            {/* <SearchCategory //* will be needed when this component will be implemented inside filter sheet
              selectedCategory={pendingFilters.category} 
              setSelectedCategory={(category) => setPendingFilters(prev => ({ ...prev, category: category as string }))}
            /> */}
            <SearchCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant={isFilterActive ? "default" : "outline"}>
                  <Filter className="w-4 h-4 mr-2" />
                  {isFilterActive ? "Filters Applied" : "Filter"}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                  <SheetDescription>Adjust filters to refine your search</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                    <Slider
                      min={99}
                      max={15000}
                      step={500}
                      value={[pendingFilters.minPrice, pendingFilters.maxPrice]}
                      onValueChange={([min, max]) => setPendingFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }))}
                    />
                    <div className="flex justify-between mt-2">
                      <span>₹{pendingFilters.minPrice}</span>
                      <span>₹{pendingFilters.maxPrice}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Rating</h3>
                    <RadioGroup
                      value={pendingFilters.rating}
                      onValueChange={(value) => setPendingFilters(prev => ({ ...prev, rating: value }))}
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                          <label htmlFor={`rating-${rating}`} className="flex items-center">
                            {Array.from({ length: rating }).map((_, index) => (
                              <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="ml-1">& up</span>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
                <SheetFooter>
                  <Button onClick={applyFilters}>Apply Filters</Button>
                  <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            {/* <Select   //* will be needed when this will be implemented inside filter sheet
              value={pendingFilters.sort} 
              onValueChange={(value) => setPendingFilters(prev => ({ ...prev, sort: value }))}
            > */}
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isFilterActive && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCategory !== "All" && (
              <Badge variant="secondary">
                Category: {selectedCategory}
                <Button variant="ghost" size="sm" className="ml-1 p-0" onClick={() => removeFilter('category')}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {(priceRange[0] !== 99 || priceRange[1] !== 15000) && (
              <Badge variant="secondary">
                Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                <Button variant="ghost" size="sm" className="ml-1 p-0" onClick={() => removeFilter('price')}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedRating !== "" && (
              <Badge variant="secondary">
                Rating: {selectedRating}+ Stars
                <Button variant="ghost" size="sm" className="ml-1 p-0" onClick={() => removeFilter('rating')}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {sortBy !== "featured" && (
              <Badge variant="secondary">
                Sort: {sortBy.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                <Button variant="ghost" size="sm" className="ml-1 p-0" onClick={() => removeFilter('sort')}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {searchTerm !== "" && (
              <Badge variant="secondary">
                Search: {searchTerm}
                <Button variant="ghost" size="sm" className="ml-1 p-0" onClick={() => removeFilter('search')}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>

        )}

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 mt-8">
            <Image src="/not-found-light.svg" alt="No products found" width={250} height={250} className="mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No products found</h2>
            <p className="text-sm">Try adjusting your filters or search term.</p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length !== 0 && filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <Link href={`/products/${product.id}`}>
                <Image src={product.image[0]} alt={product.name} width={500} height={300} className="w-full h-48 object-cover" />
              </Link>
              <CardContent className="p-4">
                <CardTitle>
                  <Link href={`/products/${product.id}`} className="text-gray-900 dark:text-gray-100 hover:underline">
                    {product.name}
                  </Link>
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-300">{product.category}</p>
                <p className="text-lg font-bold mt-2 text-gray-900 dark:text-gray-100">₹{product.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${index < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                        }`}
                    />
                  ))}

                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">({product.rating.toFixed(1)})</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter className="p-4 flex justify-between">
                <Button
                  variant={isInWishlist(product.id) ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {isInWishlist(product.id) ? 'Remove' : 'Wishlist'}
                </Button>
                <Button
                  variant={isInCart(product.id) ? "destructive" : "default"}
                  size="sm"
                  onClick={() => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isInCart(product.id) ? 'Remove' : 'Add to Cart'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {loading && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Loading more products...</p>
          </div>
        )}

        {!loading && visibleProducts < productsData.products.length && (
          <div ref={ref} className="text-center text-gray-500 dark:text-gray-400 mt-8">
            Scroll for more products
          </div>
        )}

        {!loading && visibleProducts >= productsData.products.length && filteredProducts.length !== 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            You&apos;ve reached the end of the products!
          </div>
        )}
      </div>
      {/* </div> */}
    </Suspense>
  )
}