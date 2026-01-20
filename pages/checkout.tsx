/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import Link from "next/link"
import { Button } from "../component/ui/button"
import { Input } from "../component/ui/input"
import { Label } from "../component/ui/label"
import { Textarea } from "../component/ui/textarea"
import { RadioGroup, RadioGroupItem } from "../component/ui/radio-group"
import { ArrowLeft, MapPin, Phone, CreditCard, Truck, ShieldCheck } from "lucide-react"
import Image from "next/image"
// import ProtectedPage from "../../component/ProtectedPage"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../component/ui/select";

import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../store/index";

import {
    startAddressesRealtime,

    IAddress
} from "../features/addressSlice";
import { addOrder, IForm } from "../features/orderSlice"
import {
    updateProduct,

    Product
} from "../features/productsSlice";

import { useCart } from "../context/CartContext";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../component/ui/dialog";





function CheckoutContent() {
    const { user } = useAuth()


    const [form, setForm] = useState<IForm>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        referralCode: "",
        city: null,

    })

    useEffect(() => {
        if (user) {
            // const nameParts = user.name.split(" ")
            // setFirstName(nameParts[0] || "")
            // setEmail(user.email)
            // setPhone(user.phone)
        }
    }, [user])


    const dispatch = useDispatch<AppDispatch>();
    const { addresses } = useSelector((state: RootState) => state.addresses);

    useEffect(() => {
        dispatch(startAddressesRealtime());

    }, [dispatch]);



    const {
        cart,
        clearCart
    } = useCart();


    console.log("cart", cart)

    console.log("addresses", addresses)



    const subtotal = cart.reduce((sum: any, item: any) => sum + item.product.price * item.quantity, 0)

    const cityDeliveryFee = Number(form?.city?.deliveryFee || 0);
    const FREE_DELIVERY_THRESHOLD = Number(form?.city?.deliveryFree || 0);

    const deliveryFee =
        cart.length === 0
            ? 0
            : subtotal > FREE_DELIVERY_THRESHOLD
                ? 0
                : cityDeliveryFee;

    const total = subtotal + deliveryFee;


    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    const validatePromotion = (form: any) => {
        const newErrors: { [key: string]: string } = {};



        if (!form.firstName || form.firstName.trim() === "") {
            newErrors.firstName = "First Name is required";
        }

        if (!form.lastName || form.lastName.trim() === "") {
            newErrors.lastName = "last Name is required";
        }
        if (!form.phone || form.phone.trim() === "") {
            newErrors.phone = "phone is required";
        }
        if (!form.city) {
            newErrors.city = "city is required";
        }





        return newErrors;
    };

    console.log("cart", cart)






    const handleSubmit = async () => {
        const validationErrors = validatePromotion(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoader(true);

        const fullOrderObject = {
            customer: form,
            ProductOrder: cart,
            subtotal,
            deliveryFee,
            orderStatus: { status: "pending", position: 0 },
            orderId: Math.floor(10000 + Math.random() * 90000),
            orderDate: new Date().toISOString(),
            referralCode: form.referralCode,
        };

        try {
            await dispatch(addOrder(fullOrderObject));
            for (const item of cart) {
                await dispatch(
                    updateProduct({
                        ...item.product,
                        totalSold: (item.product.totalSold || 0) + item.quantity,
                    })
                );

                console.log("product sold", item.product.id);
            }
            clearCart()
            setForm({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                referralCode: "",
                city: null,

            })

            setDialogMessage("✅ Your order has been successfully created!");


        } catch (error) {
            console.error("Error creating order:", error);
            setDialogMessage("❌ There was an issue creating your order. Please try again.");
        } finally {
            setLoader(false);
            setOpen(true);
        }
    };

    console.log("form", form);



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
                                        <Input
                                            id="firstName"
                                            placeholder="Enter first name"
                                            value={form.firstName}
                                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                            required
                                        />
                                        {errors.firstName && (
                                            <p className="text-red-500 texxt-md">{errors.firstName}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name *</Label>
                                        <Input id="lastName" placeholder="Enter last name" required
                                            value={form.lastName}
                                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                        />
                                        {errors.lastName && (
                                            <p className="text-red-500 texxt-md">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+92 XXX XXXXXXX"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        required
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 texxt-md">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Complete Address *</Label>
                                    <Textarea id="address" placeholder="House/Flat No, Street, Area, Landmark" rows={3} required />
                                </div>

                                <div >


                                    <Label htmlFor="city">City Address *</Label>

                                    <Select
                                        value={form.city?.id || ""}
                                        onValueChange={(id: string) => {
                                            const selected = addresses.find((a) => a.id === id) || null;
                                            setForm((prev) => ({ ...prev, city: selected }));
                                        }}

                                    >
                                        <SelectTrigger id="city" className="w-full">
                                            <SelectValue placeholder="Select nearest branch" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {addresses.map((address) => (
                                                <SelectItem key={address.id} value={address.id || ""}>
                                                    {address.city} {address.street}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {errors.city && (
                                        <p className="text-red-500 text-sm">{errors.city}</p>
                                    )}


                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                    <Textarea id="notes" placeholder="Any special instructions for delivery?" rows={2} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="referralCode">Referral Code</Label>
                                    <Input
                                        id="referralCode"
                                        type="text"
                                        placeholder="your.email@example.com"
                                        value={form.referralCode}
                                        onChange={(e) => setForm({ ...form, referralCode: e.target.value })}
                                    />
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
                                {cart.map((item: any) => (
                                    <div key={item.product.id} className="flex gap-3">
                                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image src={item.product.productImage || "/placeholder.svg"} alt={item.product.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm text-gray-900 truncate">{item.product.name}</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                Rs. {(item.product.price * item.quantity).toFixed(2)}
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
                                    <span>Rs. {deliveryFee ? deliveryFee.toFixed(2) : "Delivery is will be calculated after address "}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                                <span>Total</span>
                                <span>Rs. {total.toFixed(2)}</span>
                            </div>

                            <Button className="w-full cursor-pointer" size="lg"
                                onClick={() => handleSubmit()}
                            >
                                {loader ? "Processing..." : "Place Order"}
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


            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Order Status</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>{dialogMessage}</DialogDescription>
                    <DialogFooter>
                        <Button onClick={() => setOpen(false)}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default function CheckoutPage() {
    return (
        // <ProtectedPage redirectTo="/login">
        <CheckoutContent />
        // </ProtectedPage>
    )
}
