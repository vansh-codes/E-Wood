'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

export default function Terms() {
  const [accepted, setAccepted] = useState(false)

  const handleAccept = () => {
    if (accepted) {
      toast({
        title: 'Terms Accepted',
        description: 'Thank you for accepting our Terms of Service.',
      })
      // backend to save user
    } else {
      toast({
        title: 'Please Accept Terms',
        description: 'You must accept the Terms of Service to continue.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='max-w-4xl mx-auto'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-center mb-6'>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-[60vh] rounded-md border p-4'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>1. Acceptance of Terms</AccordionTrigger>
                <AccordionContent>
                  <p className='mb-2'>
                    By accessing and using our wood trading platform, you agree to comply with and
                    be bound by these Terms of Service. If you do not agree to these terms, please
                    do not use our services.
                  </p>
                  <p>
                    These terms apply to all users of the site, including without limitation users
                    who are browsers, vendors, customers, merchants, and/or contributors of content.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>2. Use of Service</AccordionTrigger>
                <AccordionContent>
                  <p className='mb-2'>
                    You agree to use our platform only for lawful purposes and in a way that does
                    not infringe the rights of, restrict or inhibit anyone else&apos;s use and
                    enjoyment of the website.
                  </p>
                  <p className='mb-2'>Prohibited activities include, but are not limited to:</p>
                  <ul className='list-disc pl-6 mb-2'>
                    <li>
                      Conducting any illegal activity or soliciting the performance of any illegal
                      activity
                    </li>
                    <li>
                      Violating any international, federal, provincial or state regulations, rules,
                      laws, or local ordinances
                    </li>
                    <li>
                      Interfering with or disrupting the integrity or performance of the Service or
                      related systems
                    </li>
                  </ul>
                  <p>
                    We reserve the right to terminate your access to the Service immediately,
                    without prior notice, if in our sole discretion you fail to comply with any term
                    or provision of these Terms.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger>3. Product Information</AccordionTrigger>
                <AccordionContent>
                  <p className='mb-2'>
                    We strive to provide accurate product descriptions and pricing. However, we do
                    not warrant that product descriptions or other content is accurate, complete,
                    reliable, current, or error-free.
                  </p>
                  <p className='mb-2'>
                    All features, content, specifications, products and prices of products and
                    services described or depicted on this website are subject to change at any time
                    without notice.
                  </p>
                  <p>
                    The inclusion of any products or services on this website does not imply or
                    warrant that these products or services will be available at any particular
                    time.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4'>
                <AccordionTrigger>4. Pricing and Payment</AccordionTrigger>
                <AccordionContent>
                  <p className='mb-2'>
                    All prices are subject to change without notice. We reserve the right to refuse
                    or cancel any orders placed for products listed at an incorrect price.
                  </p>
                  <p className='mb-2'>
                    Payment is due at the time of purchase. We accept major credit cards and other
                    forms of electronic payment as specified on our website.
                  </p>
                  <p className='mb-2'>
                    By providing a credit card or other payment method accepted by us, you represent
                    and warrant that you are authorized to use the designated payment method.
                  </p>
                  <p>
                    You agree to pay us the total amount for all of your purchases in accordance
                    with the payment terms presented to you at the time of purchase.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-5'>
                <AccordionTrigger>5. Shipping and Delivery</AccordionTrigger>
                <AccordionContent>
                  <p className='mb-2'>
                    Shipping costs and delivery times may vary depending on the product and your
                    location. We are not responsible for delays outside our control.
                  </p>
                  <p className='mb-2'>
                    Risk of loss and title for items purchased from our website pass to you upon
                    delivery of the items to the carrier.
                  </p>
                  <p>
                    We reserve the right to ship partial orders (at no additional cost to you), and
                    the portion of any order that is partially shipped may be charged at the time of
                    shipment.
                  </p>
                </AccordionContent>
              </AccordionItem>
              {/* Add more AccordionItems for the remaining sections */}
            </Accordion>
          </ScrollArea>
          <div className='mt-6 flex items-center space-x-2'>
            <Checkbox
              id='terms'
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked === true)}
            />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              I accept the terms and conditions
            </label>
          </div>
          <Button className='mt-4 w-full' onClick={handleAccept}>
            Accept Terms
          </Button>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}
