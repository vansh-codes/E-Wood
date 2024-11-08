'use strict'
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/context/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

//TODO: Add skeletons for loading states
//TODO: Add tooltips
//TODO: Add toast notifications
//TODO: enhance seo title of pages refer: https://dev.to/souhailxedits/setting-titles-dynamically-with-nextjs-metadata-4hog

export const metadata: Metadata = {
  title: {
    template: "%s | WoodTrader",
    default: "WoodTrader"
  },
  metadataBase: new URL('https://e-wood.vercel.app/'),  // canonical link
  description: "Explore our wide range of high-quality wood products. Find the perfect wood for your next project.",
  referrer: 'origin-when-cross-origin',
  keywords: ['E-wood', 'ecommerce', 'wood', 'wood-trading', 'wood-products', 'wood-supplier', 'saw-mill', 'raw-wood', 'wood-processing', 'wood-manufacturing', 'wood-furniture', 'wood-construction', 'wood-crafts', 'wood-arts', 'wood-architecture', 'wood-design', 'wood-technology', 'wood-education', 'wood-research', 'wood-innovation', 'wood-consulting', 'wood-services', 'wood-projects', 'wood-investment', 'wood-market', 'wood-industry', 'wood-business', 'wood-economy', 'wood-environment', 'wood-sustainability', 'wood-ecology', 'wood-ethics', 'wood-culture', 'wood-history', 'wood-heritage', 'wood-tradition'],
  icons: {
    icon: [
      { url: '/icon.png' },
      new URL('/icon.png', 'https://example.com'),
      { url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Wood',
    description: 'Explore our wide range of high-quality wood products. Find the perfect wood for your next project.',
    creator: '@nextjs',
    images: ['https://nextjs.org/og.png'], // Must be an absolute URL
  },
  verification: {
    google: 'google',
  },
  assets: ['https://nextjs.org/assets'],  // url for all assets
  category: 'technology',
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
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange   // check for whats this
          >
            <Header />
            <ScrollProgressBar />
            {children}
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html >
  );
}
