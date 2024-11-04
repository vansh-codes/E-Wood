import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Toaster } from "@/components/ui/toaster"

export default function PrivacyPolicy() {

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-6">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] rounded-md border p-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. Information We Collect</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">We collect personal information that you provide directly to us, such as:</p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Shipping and billing address</li>
                    <li>Payment information</li>
                    <li>Phone number</li>
                    <li>Company name (if applicable)</li>
                  </ul>
                  <p className="mb-2">We also collect information automatically when you use our services, including:</p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>Log data (e.g., IP address, browser type, pages visited)</li>
                    <li>Device information</li>
                    <li>Location information</li>
                    <li>Cookie and tracking technology data</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>2. How We Use Your Information</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about our products, services, and promotions</li>
                    <li>Improve and optimize our platform and user experience</li>
                    <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                    <li>Comply with our legal obligations</li>
                  </ul>
                  <p>We may also use your information for other purposes with your consent or as permitted by applicable law.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>3. Information Sharing and Disclosure</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">We do not sell or rent your personal information to third parties. We may share your information with:</p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>Service providers who assist us in operating our platform and conducting our business</li>
                    <li>Law enforcement or government agencies in response to a legal request</li>
                    <li>Other parties in connection with a company transaction, such as a merger or sale of assets</li>
                  </ul>
                  <p>We may also share aggregated or de-identified information that cannot reasonably be used to identify you.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>4. Data Security</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">We implement a variety of security measures to maintain the safety of your personal information, including:</p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>Encryption of sensitive data</li>
                    <li>Regular security audits</li>
                    <li>Secure network architecture</li>
                    <li>Employee training on data protection</li>
                  </ul>
                  <p className="mb-2">However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}