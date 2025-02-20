'use strict'
import { Suspense } from 'react'
import Tracking from '@/pages/Tracking'
import type { Metadata } from 'next'
import { Loader2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Track Order',
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
    title: 'Track Order',
    description:
      'Explore our wide range of high-quality wood products. Find the perfect wood for your next project.',
    url: 'https://e-wood.vercel.app/orders/_id_/track',
    siteName: 'E-Wood',
    type: 'website',
    images: [
      {
        url: '/404.svg' /* sharing card image url/path, must be absolute URL*/,
        width: 800,
        height: 600,
        alt: '404 Not Found',
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
    title: 'Track Order',
    description:
      'Explore our wide range of high-quality wood products. Find the perfect wood for your next project.',
    images: [
      {
        url: '/404.svg',
        width: 800,
        height: 600,
        alt: '404 not found',
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

export default function page({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen'>
          <Loader2 className='w-24 h-24 animate-spin' />
        </div>
      }
    >
      <Tracking params={params} />
    </Suspense>
  )
}
