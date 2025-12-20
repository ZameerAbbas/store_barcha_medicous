

import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { ArrowLeft, MapPin, Phone, CreditCard, Truck, ShieldCheck } from "lucide-react"
import Image from "next/image"

export default function CheckoutView() {
  // Sample cart items
  const cartItems = [
    { id: 1, name: "Panadol Advance", price: 150, quantity: 2, image: "/panadol-medicine-box.jpg" },
    { id: 2, name: "Vitamin C 1000mg", price: 480, quantity: 1, image: "/vitamin-c-tablets.png" },
    { id: 3, name: "Dettol Antiseptic", price: 320, quantity: 1, image: "/dettol-antiseptic-bottle.jpg" },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 100
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen bg-gray-50">
    

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Delivery Information</h2>
              </div>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter last name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="+92 XXX XXXXXXX" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea id="address" placeholder="House/Flat No, Street, Area, Landmark" rows={3} required />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" value="Gilgit" readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area/Branch *</Label>
                    <select
                      id="area"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select nearest branch</option>
                      <option value="jutial">Jutial</option>
                      <option value="baseen">Baseen</option>
                      <option value="danyor">Danyor</option>
                      <option value="konodas">Konodas</option>
                      <option value="rahimabad">Rahimabad</option>
                      <option value="chilas">Chilas Road</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Any special instructions for delivery?" rows={2} />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>

              <RadioGroup defaultValue="cod" className="space-y-4">
                <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Cash on Delivery</p>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                      </div>
                      <Truck className="w-6 h-6 text-gray-400" />
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer opacity-50">
                  <RadioGroupItem value="online" id="online" disabled />
                  <Label htmlFor="online" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">Online Payment</p>
                        <p className="text-sm text-gray-600">Coming soon</p>
                      </div>
                      <CreditCard className="w-6 h-6 text-gray-400" />
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Secure Checkout</p>
                    <p className="text-sm text-blue-700">Your information is protected and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>Rs. {deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>

              <Button className="w-full" size="lg">
                Place Order
              </Button>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <p className="text-sm font-medium text-gray-900">Need Help?</p>
                <div className="space-y-2">
                  <a
                    href="tel:+923001234567"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+92 300 1234567</span>
                  </a>
                  <a
                    href="https://wa.me/923001234567"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
