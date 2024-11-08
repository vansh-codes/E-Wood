"use client"

import { createContext, useContext, useState, useMemo } from 'react';
import { Product } from '@/lib/Product';
import { ContextProps } from '@/lib/ContextProps';

const StoreContext = createContext<ContextProps | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [loggedIn, setLoggedIn] = useState(true);

    // Handlers for cart and wishlist actions
    const addToCart = (item: Product) => setCartItems((prev) => {
        if (prev.find(cartItem => cartItem.id === item.id)) return prev;
        return [...prev, item];
    });

    const addToWishlist = (item: Product) => setWishlistItems((prev) => {
        if (prev.find(wishlistItem => wishlistItem.id === item.id)) return prev;
        return [...prev, item];
    });
    const removeFromCart = (id: number) => setCartItems((prev) => prev.filter(item => item.id !== id));
    const removeFromWishlist = (id: number) => setWishlistItems((prev) => prev.filter(item => item.id !== id));

    const setLogin = (value: boolean) => {
        setLoggedIn(value);
    }

    // Memoized context value for optimized re-renders
    const contextValue = useMemo(() => ({
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        cartCount: cartItems.length,
        wishlistCount: wishlistItems.length,
        loggedIn: loggedIn,
        setLogin,
    }), [cartItems, wishlistItems, loggedIn]);

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

// Custom hook for accessing the Store context
export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error("useStore must be used within a StoreProvider");
    return context;
};
