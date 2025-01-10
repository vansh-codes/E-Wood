import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className='bg-background border-t'>
      <div className='container mx-auto px-6 py-4'>
        <div className='flex flex-wrap'>
          <div className='w-full md:w-1/4 text-center md:text-left'>
            <h5 className='uppercase mb-6 font-bold'>Links</h5>
            <ul className='mb-4'>
              <li className='mt-2'>
                <Link href='/' className='relative group'>
                  Home
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
              <li className='mt-2'>
                <Link href='/products' className='relative group'>
                  Shop
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
              <li className='mt-2'>
                <Link href='/about' className='relative group'>
                  About
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
              <li className='mt-2'>
                <Link href='/contact' className='relative group'>
                  Contact
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
              <li className='mt-2'>
                <Link href='/faq' className='relative group'>
                  FAQ
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
            </ul>
          </div>
          <div className='w-full md:w-1/4 text-center md:text-left'>
            <h5 className='uppercase mb-6 font-bold'>Legal</h5>
            <ul className='mb-4'>
              <li className='mt-2'>
                <Link href='/terms' className='relative group'>
                  Terms of Service
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
              <li className='mt-2'>
                <Link href='/privacy' className='relative group'>
                  Privacy Policy
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
              <li className='mt-2'>
                <Link href='/sitemap.xml' className='relative group'>
                  Sitemap
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
            </ul>
          </div>
          <div className='w-full md:w-1/4 text-center md:text-left'>
            <h5 className='uppercase mb-6 font-bold'>Social</h5>
            <ul className='mb-4'>
              <li className='mt-2 flex items-center justify-center md:justify-start'>
                <Facebook className='h-5 w-5 mr-2' />
                <Link href='#' className='relative group'>
                  Facebook
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
              <li className='mt-2 flex items-center justify-center md:justify-start'>
                <Twitter className='h-5 w-5 mr-2' />
                <Link href='#' className='relative group'>
                  Twitter/X
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
              <li className='mt-2 flex items-center justify-center md:justify-start'>
                <Instagram className='h-5 w-5 mr-2' />
                <Link href='#' className='relative group'>
                  Instagram
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
              <li className='mt-2 flex items-center justify-center md:justify-start'>
                <Linkedin className='h-5 w-5 mr-2' />
                <Link href='#' className='relative group'>
                  LinkedIn
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
            </ul>
          </div>
          <div className='w-full md:w-1/4 text-center md:text-left'>
            <h5 className='uppercase mb-6 font-bold'>Company</h5>
            <ul className='mb-4'>
              <li className='mt-2'>
                <Link href='/blog' className='relative group'>
                  Blog
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
              <li className='mt-2'>
                <Link href='/careers' className='relative group'>
                  Careers
                  <span className='absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all group-hover:w-full'></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='container mx-auto px-6'>
        <div className='mt-16 border-t-2 border-gray-300 flex flex-col items-center'>
          <div className='sm:w-2/3 text-center py-6'>
            <p className='text-sm text-gray-500 font-bold mb-2'>
              © 2024 WoodTraders. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
