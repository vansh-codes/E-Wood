'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/context/StoreContext'
import { FcGoogle } from 'react-icons/fc'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LoginPage() {
  const [email, setEmail] = useState('v@gmail.com')
  const [password, setPassword] = useState('1234')
  const [error, setError] = useState('')
  const router = useRouter()
  const { setLogin } = useStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    // Here you would typically make an API call to authenticate the user
    // For this example, we'll just simulate a successful login
    if (email === 'v@gmail.com' && password === '1234') {
      setLogin(true)
      router.push('/')
    }
  }

  const handleGoogleLogin = () => {
    // login google oauth logic here
    // console.log('Logging in with Google')
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>Login</CardTitle>
          <CardDescription className='text-center'>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button variant='outline' className='w-full' onClick={handleGoogleLogin}>
            <FcGoogle className='mr-2 h-4 w-4' />
            Continue with Google
          </Button>
          <Separator />
          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
          <Link href='/forgot-password' className='text-sm text-blue-500 hover:underline'>
            Forgot password?
          </Link>
          <p className='text-sm text-center'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='text-blue-500 hover:underline'>
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
