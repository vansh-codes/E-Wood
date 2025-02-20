'use client'

import { createContext, useContext, useState, useMemo } from 'react'
import { Product } from '@/lib/Product'
import { ContextProps } from '@/lib/ContextProps'

const StoreContext = createContext<ContextProps | undefined>(undefined)

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  // Handlers for cart and wishlist actions
  const addToCart = (item: Product) =>
    setCartItems((prev) => {
      if (prev.find((cartItem) => cartItem.id === item.id)) return prev
      return [...prev, item]
    })

  const addToWishlist = (item: Product) =>
    setWishlistItems((prev) => {
      if (prev.find((wishlistItem) => wishlistItem.id === item.id)) return prev
      return [...prev, item]
    })
  const removeFromCart = (id: number) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  const removeFromWishlist = (id: number) =>
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))

  // Memoized context value for optimized re-renders
  const contextValue = useMemo(
    () => ({
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      addToWishlist,
      removeFromWishlist,
      cartCount: cartItems.length,
      wishlistCount: wishlistItems.length,
    }),
    [cartItems, wishlistItems]
  )

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>
}

// Custom hook for accessing the Store context
export const useStore = () => {
  const context = useContext(StoreContext)
  // console.log("context: ",context); // This will log `undefined` if outside of provider
  // if (!context) throw new Error("useStore must be used within a StoreProvider");
  if (!context) {
    // console.warn("useStore was called outside of a StoreProvider. Returning default values.");
    return {
      cartItems: [],
      wishlistItems: [],
      addToCart: () => {},
      removeFromCart: () => {},
      addToWishlist: () => {},
      removeFromWishlist: () => {},
      cartCount: 0,
      wishlistCount: 0,
      setLogin: () => {},
    } // Return default values
  }
  return context
}
