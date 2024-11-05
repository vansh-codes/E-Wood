export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    discount: number;
    image: Array<string>;
    description: string;
    specifications: Record<string, string>;
    stock: number;
    quantity: number;
    featured: boolean;
    rating: number;
    reviews: Array<{
        id: number;
        user: string;
        rating: number;
        comment: string;
    }>;
}