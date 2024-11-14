'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useStore } from '@/context/StoreContext'
import ModeToggle from '@/components/mode-toggle'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetFooter, SheetTitle, SheetClose } from "@/components/ui/sheet"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, Heart, User, Search, Menu, LogIn } from 'lucide-react'

export function Header() {
  const { cartCount, wishlistCount, loggedIn } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter();

  return (
    <header className="sticky top-1 z-50 w-full bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex items-center space-x-6">
          <Link href="/" className="text-lg font-bold">
            WoodTraders
          </Link>
          <nav className="flex space-x-4 lg:space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors">
              Home
            </Link>
            <Link href="/products" className="transition-colors">
              Shop
            </Link>
            <Link href="/about" className="transition-colors">
              About
            </Link>
            <Link href="/contact" className="transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-4 px-0 text-base md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              {/* <SheetClose /> */}
            </SheetHeader>
            <MobileNav loggedIn={loggedIn}/>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 justify-end space-x-4 md:space-x-2">
          {isSearchOpen && (
            <Input
              type="search"
              placeholder="Search products..."
              className="w-[150px] sm:w-[250px] md:w-[300px] lg:w-[400px] transition-all"
            />
          )}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Toggle search</span>
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={() => router.push('/wishlist')}>
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center  rounded-full text-xs">
                  {wishlistCount}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Cart Button */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => router.push('/cart')}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center  rounded-full text-xs">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>

            {loggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => router.push('/profile')}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push('/orders')}>Orders</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push('/settings')}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => router.push('/logout')}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => router.push('/login')}>
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            )}

            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileNav({loggedIn}: {loggedIn: boolean}) {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-6 items-center mt-12">
      <Link href="/" className="font-bold">Home</Link>
      <Link href="/products" className="font-bold">Shop</Link>
      <Link href="/about" className="font-bold">About</Link>
      <Link href="/contact" className="font-bold">Contact</Link>
      {loggedIn && (
        <SheetFooter className='absolute bottom-1'>
        <SheetClose asChild>
          <Button variant="outline" onClick={() => router.push('/logout')}>Logout</Button>
        </SheetClose>
      </SheetFooter>
      )}
    </div>
  )
}