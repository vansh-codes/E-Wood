"use client"

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Heart, ArrowLeft, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import productsData from '@/data/products.json'
import ShareButton from '@/components/ShareButton'
import { Toaster } from "@/components/ui/toaster"
import { Product } from '@/lib/Product'
import { useStore } from '@/context/StoreContext'
import Image from 'next/image'

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const { addToCart, addToWishlist, removeFromCart, removeFromWishlist, cartItems, wishlistItems } = useStore()
  const [loading, setLoading] = useState(true)
  const [id] = useState(params.id)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    const productId = parseInt(id || '0', 10)
    const foundProduct = productsData.products.find(p => p.id === productId)
    setProduct(foundProduct || null)
    setLoading(false)
  }, [id])

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const incrementQuantity = () => {
    if (product) {
      product.quantity += 1
      setProduct({ ...product })
    }
  }
  const decrementQuantity = () => {
    if (product && product.quantity > 1) {
      product.quantity -= 1
      setProduct({ ...product })
    }
  }

  const isInCart = (productId: number) => (cartItems ?? []).some(item => item.id === productId)
  const isInWishlist = (productId: number) => (wishlistItems ?? []).some(item => item.id === productId)

  if (loading) {
    return <div className="min-h-screen p-8 text-center">Loading...</div>
  }

  if (!product) {
    return <div className="min-h-screen p-8 text-center">Product not found</div>
  }

  const displayImages = product.image || ["/hardwood.png", "/softwood.png", "/exotic.png"]

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen p-8">
        <Link href="/products" className="mb-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
          </Button>
        </Link>

        <div className="rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {displayImages.map((image, index) => (
                    <CarouselItem key={index} className="relative">
                      <Image
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        width={500}
                        height={500}
                        className="w-full h-[400px] object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute bottom-4 left-0 right-0">
                  <div className="flex items-center justify-center gap-2">
                    {displayImages.map((_, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className={`w-3 h-3 rounded-full p-0 ${index === current ? 'bg-primary' : 'bg-primary/50'
                          }`}
                        onClick={() => api?.scrollTo(index)}
                      />
                    ))}
                  </div>
                </div>
              </Carousel>
            </div>
            <div className="md:w-1/2 p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-400 font-semibold">{product.category}</div>
              <h1 className="mt-1 text-4xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{product.description}</p>

              <div className="mt-4">
                {product.discount > 0 && (
                  <div className="text-gray-500 dark:text-gray-400">
                    <span className="line-through">₹{product.price.toFixed(2)}</span>
                    <span className="ml-2 text-red-500 dark:text-red-400">({product.discount}% off)</span>
                  </div>
                )}
                <span className={`text-3xl font-bold text-gray-900 dark:text-white ${product.stock <= 0 ? "line-through" : ""}`}>₹{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                {product.stock > 0 ? (
                  <Badge className="ml-2 bg-green-500 dark:bg-green-600">In Stock</Badge>
                ) : (
                  <Badge className="ml-2 bg-red-500 dark:bg-red-600">Out of Stock</Badge>
                )
                }
              </div>

              <div className="mt-6 flex items-center">
                <Button variant="outline" size="sm" onClick={decrementQuantity} className="text-gray-600 dark:text-gray-300">-</Button>
                <span className="mx-4 text-xl text-gray-900 dark:text-white">{product.quantity}</span>
                <Button variant="outline" size="sm" onClick={incrementQuantity} className="text-gray-600 dark:text-gray-300">+</Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={() => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
                <ShareButton url={window.location.href} title={`Check out ${product.name}`} />
              </div>
            </div>
          </div>

          <Tabs defaultValue="specifications" className="p-8">
            <TabsList>    {/* style the tabs trigger later with theme */}
              <TabsTrigger value="specifications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications">
              <Card>
                <CardContent className="pt-6">
                  <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium">{key}</dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="mb-4 pb-4 border-b last:border-b-0">
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-gray-900 dark:text-white mr-2">{review.user}</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'stroke-current'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Toaster />
      </div>
    </Suspense>
  )
}