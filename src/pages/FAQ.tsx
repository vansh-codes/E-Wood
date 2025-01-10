import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import faqData from '@/data/faq'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function FAQ() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-center mb-6'>
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type='single' collapsible className='w-full'>
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className='text-left'>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        {/*         <CardFooter className="bg-gray-100 dark:bg-gray-900 rounded-b-lg py-4">
          <p className="text-gray-700 dark:text-gray-100 text-center">
            Still have questions? <a href="mailto:askwood@gmail.com" className="text-blue-500 hover:underline">Email us</a> or visit our <a href="/contact" className="text-blue-500 hover:underline">Contact Page</a>.
          </p>
        </CardFooter> */}
      </Card>
    </div>
  )
}
