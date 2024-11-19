import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

//TODO: use form conponent to enhance and add validation to this: https://ui.shadcn.com/docs/components/form

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We&aspos;re here to help and answer any question you might have. We look forward to hearing from you!
          </p>
          
          <form className="space-y-4">
            <Input type="text" placeholder="Your Name" className="bg-white dark:bg-gray-800" />
            <Input type="email" placeholder="Your Email" className="bg-white dark:bg-gray-800" />
            <Input type="text" placeholder="Subject" className="bg-white dark:bg-gray-800" />
            <Textarea placeholder="Your Message" className="bg-white dark:bg-gray-800" rows={5} />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2" /> Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">Infront of Shri ji garden, Phase 2, Goverdhan Road, ABC, XYZ</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2" /> Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p  className="text-gray-700 dark:text-gray-300">+91 98370 XXXXX</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2" /> Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">info@woodtraders.com</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Visit Our Showroom</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15445441.294633977!2d53.35784912109375!3d19.069905620644693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle%20maps%20ferrari%20showroom%20india!5e0!3m2!1sen!2sin!4v1732024651977!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{border:0}} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  )
}