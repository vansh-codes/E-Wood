'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  // async function onSubmit(data: ForgotPasswordValues) {
  async function onSubmit() {
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Implement actual API call to request password reset
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulats API call
      setIsSubmitted(true)
    } catch {
      setError('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container mx-auto flex items-center justify-center min-h-screen px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>Forgot Password</CardTitle>
          <CardDescription className='text-center'>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <Alert className='mb-4'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Check your email</AlertTitle>
              <AlertDescription>
                We&apos;ve sent a password reset link to your email address. Please check your inbox
                and follow the instructions to reset your password.
              </AlertDescription>
            </Alert>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter your email address' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && (
                  <Alert variant='destructive'>
                    <AlertCircle className='h-4 w-4' />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Sending Reset Link
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link
            href='/login'
            className='flex items-center text-sm text-muted-foreground hover:text-primary'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
