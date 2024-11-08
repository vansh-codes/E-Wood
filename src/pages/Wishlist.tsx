"use client"

import { useState, memo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStore } from '@/context/StoreContext'
import Image from 'next/image'
import Link from 'next/link'
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface WishlistItemProps {
    item: {
        id: number;
        image: string[];
        name: string;
        price: number;
    };
    selectedItems: number[];
    handleSelectItem: (id: number) => void;
}

const WishlistItem = memo(({ item, selectedItems, handleSelectItem }: WishlistItemProps) => (
    <TableRow key={item.id}>
        <TableCell>
            <Checkbox
                checked={selectedItems.includes(item.id)}
                onCheckedChange={() => handleSelectItem(item.id)}
            />
        </TableCell>
        <TableCell>
            <Link href={`products/${item.id}`}>
                <Image src={item.image[0]} alt={item.name} width={100} height={100} loading="lazy" className="w-16 h-16 object-cover" />
            </Link>
        </TableCell>
        <TableCell>
            <Link href={`products/${item.id}`} className='hover:underline'>
                {item.name}
            </Link>
        </TableCell>
        <TableCell>₹{item.price.toFixed(2)}</TableCell>
    </TableRow>
))

WishlistItem.displayName = 'WishlistItem'


const Wishlist = () => {
    const { addToCart, removeFromWishlist, wishlistItems } = useStore()
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const allSelected = wishlistItems.length > 0 && selectedItems.length === wishlistItems.length

    const handleSelectItem = (itemId: number) => {
        setSelectedItems(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        )
    }

    const handleSelectAll = () => {
        setSelectedItems(allSelected ? [] : wishlistItems.map(item => item.id))
    }

    const handleBulkAction = (action: 'addToCart' | 'removeFromWishlist') => {
        selectedItems.forEach(itemId => {
            const item = wishlistItems.find(item => item.id === itemId)
            if (item && action === 'addToCart') addToCart(item)
            else if (action === 'removeFromWishlist') removeFromWishlist(itemId)
        })
        setSelectedItems([])
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {wishlistItems.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">My Wishlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center space-y-4 py-8">
                            <Image src='/empty_wishlist.svg' alt="Empty Wishlist" loading="lazy" width={500} height={300} className="mb-4" />
                            <p className="text-3xl">No items in wishlist</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">My Wishlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={allSelected}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {wishlistItems.map(item => (
                                    <WishlistItem
                                        key={item.id}
                                        item={item}
                                        selectedItems={selectedItems}
                                        handleSelectItem={handleSelectItem}
                                    />
                                ))
                                }
                            </TableBody>
                        </Table>
                        <div className="mt-4 flex justify-end space-x-4">
                            <Button onClick={() => handleBulkAction('addToCart')} disabled={selectedItems.length === 0}>
                                Add Selected to Cart
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button variant="destructive" disabled={selectedItems.length === 0}>
                                        Remove Selected
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will remove the products from your wishlist.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleBulkAction('removeFromWishlist')}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default Wishlist