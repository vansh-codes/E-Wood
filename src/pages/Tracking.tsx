"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Check, Truck, Package, ShoppingBag, AlertTriangle, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import {orderDetails} from '@/data/orders'

type OrderDetail = {
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
  },
  estimatedDelivery: string
}

const trackingSteps = [
  { id: 1, title: 'Order Placed', icon: ShoppingBag },
  { id: 2, title: 'Processing', icon: Package },
  { id: 3, title: 'Shipped', icon: Truck },
  { id: 4, title: 'Delivered', icon: Check },
]

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderDetails = () => {
      try {
        // Replace this with actual API call
        const response = orderDetails.find((order) => order.id === params.id) || null
        if (!response) {
          throw new Error('Failed to fetch order details')
        }
        const data: OrderDetail = response
        setOrder(data)
      } catch {
        setError('An error occurred while fetching order details')
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [params.id])

  const getCurrentStep = (status: string) => {
    switch (status) {
      case 'Order Placed':
        return 1
      case 'Processing':
        return 2
      case 'Shipped':
        return 3
      case 'Delivered':
        return 4
      default:
        return 0
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Error</h1>
        <p className="text-gray-600">{error || 'Order not found'}</p>
        <Button variant="ghost" onClick={() => router.back()} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    )
  }

  const currentStep = getCurrentStep(order.status)

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Order Details
      </Button>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Order Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Order Information</h3>
              <p>Order ID: {order.id}</p>
              <p>Date: {format(new Date(order.date), 'MMMM d, yyyy')}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Status: <span className="font-semibold">{order.status}</span></p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p>{order.shipping.address}</p>
              <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
              <p>{order.shipping.country}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Tracking Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {trackingSteps.map((step, index) => (
              <div key={step.id} className="flex items-center mb-8 last:mb-0">
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: currentStep >= step.id ? 1 : 0 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentStep >= step.id ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  {index < trackingSteps.length - 1 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: currentStep > step.id ? '100%' : 0 }}
                      className="absolute left-6 top-12 w-0.5 bg-green-500 h-full"
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-500">
                    {currentStep >= step.id ? format(new Date(order.date), 'MMMM d, yyyy h:mm a') : 'Pending'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Items</h3>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Payment Information</h3>
              <p>Method: {order.payment.method}</p>
              <p>Card: **** **** **** {order.payment.cardLast4}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}