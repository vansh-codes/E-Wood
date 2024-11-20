"use client"

import { useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/lib/Product';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function Cart() {
    const { addToWishlist, removeFromCart, cartItems, addToCart } = useStore();

    const updateQuantity = useCallback((id: number, newQuantity: number) => {
        if (isNaN(newQuantity) || newQuantity < 1) return;

        const item = cartItems.find(item => item.id === id);
        if (item) {
            removeFromCart(id); // Remove existing item
            addToCart({ ...item, quantity: newQuantity }); // Add with updated quantity
        }
    }, [cartItems, addToCart, removeFromCart]);

    const removeItem = useCallback((id: number) => {
        removeFromCart(id);
    }, [removeFromCart]);

    const addToWishlistAndRemove = useCallback((item: Product) => {
        addToWishlist(item);
        removeItem(item.id);
    }, [addToWishlist, removeItem]);

    const total = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cartItems]
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {cartItems.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Shopping Cart</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center space-y-4 py-8">
                            <Image
                                src="/empty_cart.svg"
                                alt="Empty Cart"
                                width={500}
                                height={300}
                                className="mb-4"
                                loading="lazy"
                            />
                            <p className="text-3xl">No items in Cart</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Shopping Cart</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead colSpan={2}>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cartItems.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Link href={`/products/${item.id}`}>
                                                <Image
                                                    src={item.image[0]}
                                                    alt={item.name}
                                                    width={100}
                                                    height={100}
                                                    className="w-16 h-16 object-cover"
                                                    loading="lazy"
                                                />
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/products/${item.id}`} className="text-gray-900 dark:text-gray-100 hover:underline">
                                                {item.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>₹{item.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                min="1"
                                                className="w-20"
                                            />
                                        </TableCell>
                                        <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                                        <TableCell className="flex flex-col items-start space-y-2">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">
                                                        Remove
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will remove the products from your cart.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => removeItem(item.id)}>Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                            <span className="text-sm text-gray-500 cursor-pointer hover:underline" onClick={() => addToWishlistAndRemove(item)}>
                                                Add to wishlist instead
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div className="text-lg font-bold sm:text-md">Total: ₹{total.toFixed(2)}</div>
                        <Button size="lg">
                            <Link href="/pay">Proceed to Checkout</Link>
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};