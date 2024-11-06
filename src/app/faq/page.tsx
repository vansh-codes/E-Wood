'use strict'
import FAQ from "@/pages/FAQ"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Explore our wide range of high-quality wood products. Find the perfect wood for your next project.',
  applicationName: '', //application name
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  openGraph: {
    title: 'FAQ',
    description: 'Explore our wide range of high-quality wood products. Find the perfect wood for your next project.',
    url: 'https://yourwebsite.com/404',
    siteName: 'Next.js',
    type: 'website',
    images: [
      {
        url: '/404.svg',  /* sharing card image url/path, must be absolute URL*/
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
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourwebsite', // The Twitter username of the website or content creator
    title: 'FAQ',
    description: 'Explore our wide range of high-quality wood products. Find the perfect wood for your next project.',
    images: [
      {
      url: '/404.svg',
      width: 800,
      height: 600,
      alt: '404 not found'
      }
  ], // The image URL for the Twitter card
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
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
  assets: ['https://nextjs.org/assets'],  // url for all assets
  category: 'technology',
}


export default function page() {
  return (
    <FAQ />
  )
}
