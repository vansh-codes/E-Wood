'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [newsletter, setNewsletter] = useState(true)
  const [language, setLanguage] = useState('english')
  const [currency, setCurrency] = useState<'inr' | 'usd' | 'eur'>('inr')

  const handleSaveSettings = () => {
    // send the settings to backend to update
    console.log('Saved settings:', { notifications, newsletter, language, currency })
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div>
              <Label htmlFor='notifications' className='text-base'>
                Notifications
              </Label>
              <p className='text-sm text-muted-foreground'>Receive order and account updates</p>
            </div>
            <Switch id='notifications' checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <Label htmlFor='newsletter' className='text-base'>
                Newsletter
              </Label>
              <p className='text-sm text-muted-foreground'>Receive marketing emails</p>
            </div>
            <Switch id='newsletter' checked={newsletter} onCheckedChange={setNewsletter} />
          </div>
          <div>
            <Label htmlFor='language' className='text-base'>
              Language
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className='w-full mt-1'>
                <SelectValue placeholder='Select language' />
              </SelectTrigger>
              <SelectContent className='dark:text-gray-100 backdrop-blur-sm'>
                <SelectItem value='english' className='cursor-pointer'>
                  English
                </SelectItem>
                <SelectItem value='spanish' className='cursor-pointer'>
                  Spanish
                </SelectItem>
                <SelectItem value='french' className='cursor-pointer'>
                  French
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='currency' className='text-base'>
              Currency
            </Label>
            <Select
              value={currency}
              onValueChange={(value: string) => setCurrency(value as 'inr' | 'usd' | 'eur')}
            >
              <SelectTrigger className='w-full mt-1'>
                <SelectValue placeholder='Select currency' />
              </SelectTrigger>
              <SelectContent className='dark:text-gray-100 backdrop-blur-sm'>
                <SelectItem value='inr' className='cursor-pointer'>
                  INR
                </SelectItem>
                <SelectItem value='usd' className='cursor-pointer'>
                  USD
                </SelectItem>
                <SelectItem value='eur' className='cursor-pointer'>
                  EUR
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSaveSettings} className='w-full'>
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
