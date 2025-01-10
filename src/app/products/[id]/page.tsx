'use strict'
import { Suspense } from 'react'
import ProductDetails from '@/pages/ProductDetails'
import type { Metadata } from 'next'
import productsData from '@/data/products.json'
import { Loader2 } from 'lucide-react'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = (await params).id

  // fetch data
  const product = productsData.products.find((p) => p.id === Number(id))

  return {
    title: product ? product.name : 'Product not found',
    description:
      'Explore our wide range of high-quality wood products. Find the perfect wood for your next project.',
    applicationName: '', //application name
    referrer: 'origin-when-cross-origin',
    keywords: [
      'E-wood',
      'ecommerce',
      'wood',
      'wood-trading',
      'wood-products',
      'wood-supplier',
      'saw-mill',
      'raw-wood',
      'wood-processing',
      'wood-manufacturing',
      'wood-furniture',
      'wood-construction',
      'wood-crafts',
      'wood-arts',
      'wood-architecture',
      'wood-design',
      'wood-technology',
      'wood-education',
      'wood-research',
      'wood-innovation',
      'wood-consulting',
      'wood-services',
      'wood-projects',
      'wood-investment',
      'wood-market',
      'wood-industry',
      'wood-business',
      'wood-economy',
      'wood-environment',
      'wood-sustainability',
      'wood-ecology',
      'wood-ethics',
      'wood-culture',
      'wood-history',
      'wood-heritage',
      'wood-tradition',
    ],
    openGraph: {
      title: product ? product.name : 'Products',
      description: product
        ? product.description
        : 'Explore our wide range of high-quality wood products. Find the perfect wood for your next project.',
      url: 'https://e-wood.vercel.app/products',
      siteName: 'E-Wood',
      type: 'website',
      images: [
        {
          url: product
            ? product.image[0]
            : '/404.svg' /* sharing card image url/path, must be absolute URL*/,
          width: 800,
          height: 600,
          alt: product ? product.name : 'Products',
        },
      ],
      videos: [
        {
          url: 'https://nextjs.org/video.mp4', // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@yourwebsite', // The Twitter username of the website or content creator
      title: product ? product.name : 'Products',
      description: product
        ? product.description
        : 'Explore our wide range of high-quality wood products. Find the perfect wood for your next project.',
      images: [
        {
          url: product ? product.image[0] : '/404.svg',
          width: 800,
          height: 600,
          alt: product ? product.name : 'Products',
        },
      ], // The image URL for the Twitter card
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/404.svg',
      shortcut: '/shortcut-icon.png',
      apple: '/apple-icon.png',
    },
    verification: {
      google: 'google',
    },
    assets: ['https://nextjs.org/assets'], // url for all assets
    category: 'technology',
  }
}

export default function page({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen'>
          <Loader2 className='w-24 h-24 animate-spin' />
        </div>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  )
}
