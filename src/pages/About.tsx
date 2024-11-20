import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About WoodTraders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Founded in 2010, WoodTraders has grown from a small local supplier to a nationwide leader in premium wood products. Our passion for quality craftsmanship and sustainable sourcing has driven our success over the years.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            We take pride in offering a wide range of wood types to meet the diverse needs of our customers, from hobbyist woodworkers to large-scale construction projects.
          </p>
        </div>
        <div className="dark:bg-gray-800 p-2 rounded-xl overflow-hidden">
          <Image src="/about.svg" alt="Our Workshop" layout="responsive" loading="lazy" width={500} height={300} className="w-full h-full object-cover" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-center">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { title: "Quality", description: "We source only the finest wood materials, ensuring each piece meets our high standards." },
          { title: "Sustainability", description: "Our commitment to responsible forestry practices helps preserve our natural resources for future generations." },
          { title: "Customer Service", description: "We pride ourselves on providing expert advice and support to help you find the perfect wood for your project." }
        ].map((value, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{value.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {value.description}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Commitment to You</h2>
        <p className="text-center max-w-2xl mx-auto">
          At WoodTraders, we&apos;re more than just a supplier. We&apos;re your partner in bringing your wood projects to life. From selection to delivery, we&apos;re committed to providing you with an exceptional experience and products that exceed your expectations.
        </p>
      </div>
    </div>
  )
}