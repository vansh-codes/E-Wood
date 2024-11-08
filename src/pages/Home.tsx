"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from 'next/image'
import { Parallax } from "react-parallax"
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"
import { ChevronDown, Truck, Clock, Shield, Award } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import GridPattern from "@/components/ui/grid-pattern";
import WordPullUp from "@/components/ui/word-pull-up";
import Autoplay from "embla-carousel-autoplay"
import productsData from '@/data/products.json'
import { Testimonials } from "@/components/Testimonals"
import { cn } from "@/lib/utils";

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation()
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible")
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const featuredProducts = productsData.products.filter(product => product.featured)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    // <div className="min-h-screen bg-[url('/wood-texture-light.png')] dark:bg-[url('/wood-texture-dark.png')] bg-contain" >
    <div className="min-h-screen" >
      {/* <Parallax bgImage="/hero-wood-background.png" strength={500}> */}
      <Parallax strength={500}>
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
              <WordPullUp
                className="text-4xl font-bold mb-4 lg:text-7xl tracking-[-0.02em] text-black dark:text-white md:text-6xl md:leading-[5rem]"
                words="Welcome to WoodTraders"
              />
            <motion.p
              className="text-xl md:text-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Discover the finest selection of wood for all your projects
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Link href="/products">Shop Now</Link>
              </Button>
            </motion.div>
          </div>
        </div>
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] dark:[mask-image:radial-gradient(600px_circle_at_center,black,transparent)]",
          )}
        />
      </Parallax>

      <div className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Featured Products</h2>
            <Carousel
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
              plugins={[Autoplay({ delay: 3000 })]}
            >
              <CarouselContent>
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id}>
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-gray-100">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Image src={product.image[0]} alt={product.name} width={500} height={300} className="w-full h-48 object-cover rounded-md" />
                        <p className="mt-2 text-sm text-muted-foreground dark:text-gray-400">{product.category}</p>
                        <p className="mt-1 text-lg font-bold">₹{product.price.toFixed(2)}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/products/${product.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Quality", description: "Premium wood from sustainable sources", icon: <Award className="w-8 h-8" /> },
                { title: "Variety", description: "Wide range of wood types for every need", icon: <ChevronDown className="w-8 h-8" /> },
                { title: "Expertise", description: "Expert advice and customer support", icon: <Shield className="w-8 h-8" /> },
                { title: "Value", description: "Competitive pricing and regular deals", icon: <Clock className="w-8 h-8" /> },
              ].map((item, index) => (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Our Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsData.categories.map((category, index) => (
                <Card key={index} className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                  <Image src={category.image} alt={category.name} width={500} height={300} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <CardTitle className="text-gray-900 dark:text-gray-100">{category.name}</CardTitle>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{category.description}</p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
                      </HoverCardContent>
                    </HoverCard>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/products?category=${category.name}`}>Explore {category.name}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Custom Cutting", description: "We offer custom cutting services to meet your specific needs.", icon: <ChevronDown className="w-8 h-8" /> },
                { title: "Fast Delivery", description: "Quick and reliable delivery to your doorstep.", icon: <Truck className="w-8 h-8" /> },
                { title: "Expert Consultation", description: "Get advice from our wood experts for your projects.", icon: <Shield className="w-8 h-8" /> },
              ].map((service, index) => (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center">
                      <span className="mr-2">{service.icon}</span>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Customer Testimonials</h2>
            <div className="flex justify-center items-center">
              <Testimonials />
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div >
  )
}