'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Truck } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { orderDetails } from '@/data/orders'

type orderDetail = {
  id: string
  date: string
  total: number
  status: string
  items: {
    id: string
    name: string
    quantity: number
    price: number
  }[]
  shipping: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  payment: {
    method: string
    cardLast4: string
  }
  estimatedDelivery: string
}

export default function OrderDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<orderDetail | null>(null)

  useEffect(() => {
    const data = orderDetails.find((order) => order.id === params.id) || null
    // console.log(data)
    setOrder(data)
  }, [params.id])

  if (!order) {
    return <div className='min-h-screen p-8 text-center'>Order not found</div>
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Button variant='ghost' onClick={() => router.back()} className='mb-4'>
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back to Orders
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Order Details</CardTitle>
          <CardDescription>Order ID: {order.id}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm text-gray-500'>Order Date</p>
              <p className='font-medium'>{format(new Date(order.date), 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Total Amount</p>
              <p className='font-medium'>${order.total.toFixed(2)}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Status</p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'Processing'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'Shipped'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className='font-semibold mb-2'>Order Items</h3>
            <table className='w-full'>
              <thead>
                <tr className='text-left text-sm text-gray-500'>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Separator />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <h3 className='font-semibold mb-2'>Shipping Information</h3>
              <p>{order.shipping.address}</p>
              <p>
                {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
              </p>
              <p>{order.shipping.country}</p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Payment Information</h3>
              <p>{order.payment.method}</p>
              <p>Card ending in {order.payment.cardLast4}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/orders/${order.id}/track`} className='w-full'>
            <Button>
              <Truck className='mr-2 h-4 w-4' />
              Track Order
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
