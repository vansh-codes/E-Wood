'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa'
import { BsBank } from 'react-icons/bs'
import { SiPaytm } from 'react-icons/si'

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [upiId, setUpiId] = useState('')
  const [bank, setBank] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (paymentMethod === 'card') {
      if (!cardNumber) newErrors.cardNumber = 'Card number is required'
      else if (!/^\d{16}$/.test(cardNumber)) newErrors.cardNumber = 'Invalid card number'
      if (!expiryDate) newErrors.expiryDate = 'Expiry date is required'
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate))
        newErrors.expiryDate = 'Invalid expiry date'
      if (!cvv) newErrors.cvv = 'CVV is required'
      else if (!/^\d{3}$/.test(cvv)) newErrors.cvv = 'Invalid CVV'
    } else if (paymentMethod === 'upi') {
      if (!upiId) newErrors.upiId = 'UPI ID is required'
    } else if (paymentMethod === 'netbanking') {
      if (!bank) newErrors.bank = 'Please select a bank'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // API Call to process payment
    router.push('/order-confirmation')
  }

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Payment Gateway</CardTitle>
          <CardDescription>Choose your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment} className='space-y-6'>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className='grid grid-cols-2 gap-4'
            >
              <Label className='flex items-center space-x-2 border rounded-lg p-4 cursor-pointer'>
                <RadioGroupItem value='card' id='card' />
                <FaCreditCard className='w-6 h-6' />
                <span>Credit/Debit Card</span>
              </Label>
              <Label className='flex items-center space-x-2 border rounded-lg p-4 cursor-pointer'>
                <RadioGroupItem value='upi' id='upi' />
                <SiPaytm className='w-6 h-6' />
                <span>UPI</span>
              </Label>
              <Label className='flex items-center space-x-2 border rounded-lg p-4 cursor-pointer'>
                <RadioGroupItem value='netbanking' id='netbanking' />
                <BsBank className='w-6 h-6' />
                <span>Net Banking</span>
              </Label>
              <Label className='flex items-center space-x-2 border rounded-lg p-4 cursor-pointer'>
                <RadioGroupItem value='cod' id='cod' />
                <FaMoneyBillWave className='w-6 h-6' />
                <span>Cash on Delivery</span>
              </Label>
            </RadioGroup>

            {paymentMethod === 'card' && (
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='cardNumber'>Card Number</Label>
                  <Input
                    id='cardNumber'
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder='1234 5678 9012 3456'
                  />
                  {errors.cardNumber && <p className='text-sm text-red-500'>{errors.cardNumber}</p>}
                </div>
                <div className='flex space-x-4'>
                  <div className='flex-1'>
                    <Label htmlFor='expiryDate'>Expiry Date</Label>
                    <Input
                      id='expiryDate'
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder='MM/YY'
                    />
                    {errors.expiryDate && (
                      <p className='text-sm text-red-500'>{errors.expiryDate}</p>
                    )}
                  </div>
                  <div className='flex-1'>
                    <Label htmlFor='cvv'>CVV</Label>
                    <Input
                      id='cvv'
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder='123'
                    />
                    {errors.cvv && <p className='text-sm text-red-500'>{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div>
                <Label htmlFor='upiId'>UPI ID</Label>
                <Input
                  id='upiId'
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder='username@upi'
                />
                {errors.upiId && <p className='text-sm text-red-500'>{errors.upiId}</p>}
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div>
                <Label htmlFor='bank'>Select Bank</Label>
                <Select value={bank} onValueChange={setBank}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a bank' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='sbi'>State Bank of India</SelectItem>
                    <SelectItem value='hdfc'>HDFC Bank</SelectItem>
                    <SelectItem value='icici'>ICICI Bank</SelectItem>
                    <SelectItem value='axis'>Axis Bank</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bank && <p className='text-sm text-red-500'>{errors.bank}</p>}
              </div>
            )}

            {paymentMethod === 'cod' && (
              <p className='text-sm text-gray-500'>
                You will pay for your order when it is delivered to you.
              </p>
            )}

            <Button type='submit' className='w-full'>
              {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className='text-sm text-center w-full text-gray-500'>
            Your payment information is secure and encrypted
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
