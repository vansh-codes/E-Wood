/* 'use client'

import { useRouter } from 'next/navigation'
import { useStore } from '@/context/StoreContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Logout() {
  const router = useRouter()
  const { setLogin } = useStore()

  const handleLogout = () => {
    // clear session here to logout
    // console.log("Logging out...")
    setLogin(false)
    router.push('/')
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className='w-96'>
        <CardHeader>
          <CardTitle>Logout</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Are you sure you want to logout?</p>
          <div className='flex justify-end space-x-4 mt-4'>
            <Button onClick={handleLogout} variant='destructive'>
              Logout
            </Button>
            <Button onClick={() => router.back()} variant='secondary'>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
 */
