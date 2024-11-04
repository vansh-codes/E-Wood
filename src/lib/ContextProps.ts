import { Product } from '@/lib/Product';

export interface ContextProps {
    cartItems: Product[];
    wishlistItems: Product[];
    cartCount: number;
    wishlistCount: number;
    loggedIn: boolean;
    setLogin: (value: boolean) => void;
    addToCart: (item: Product) => void;
    removeFromCart: (id: number) => void;
    addToWishlist: (item: Product) => void;
    removeFromWishlist: (id: number) => void;
}
