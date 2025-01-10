'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

function generateOrderId() {
  const randomNum = Math.floor(Math.random() * 100)
  return 'ord' + String(randomNum).padStart(3, '0')
}

export default function OrderConfirmation() {
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    setOrderId(generateOrderId())
  }, [])

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>Order Confirmed!</CardTitle>
          <CardDescription className='text-center'>Thank you for your purchase</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className='flex justify-center'
          >
            <CheckCircle className='w-24 h-24 text-green-500' />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='text-center text-lg font-semibold'
          >
            Your order has been successfully placed!
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className='text-center'
          >
            Order ID: <span className='font-bold'>{orderId}</span>
          </motion.p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link href='/products'>
            <Button>Continue Shopping</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
