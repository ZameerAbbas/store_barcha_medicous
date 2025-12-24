/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "../component/ui/button";
import { useCart } from "../context/CartContext";

export default function CartPage() {
    const {
        cart,
        increaseQty,
        decreaseQty,
        removeFromCart,
    } = useCart();

    const subtotal = cart.reduce(
        (sum: any, item: any) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">{cart.length} items in your cart</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.length === 0 ? (
                            <div className="bg-white p-12 rounded-lg text-center">
                                <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Your cart is empty
                                </h3>
                                <Link href="/products">
                                    <Button>Browse Products</Button>
                                </Link>
                            </div>
                        ) : (
                            cart.map((item: any) => (
                                <div
                                    key={item.product.id}
                                    className="bg-white rounded-lg shadow-sm p-6"
                                >
                                    <div className="flex gap-4">


                                        <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                                            <Image
                                                src={item.product.productImage || "/placeholder.svg"}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>


                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h3 className="font-semibold">
                                                    {item.product.name}
                                                </h3>

                                                <button
                                                    onClick={() =>
                                                        removeFromCart(item.product.id)
                                                    }
                                                    className="text-gray-400 hover:text-red-600 cursor-pointer"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-center mt-4">


                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        onClick={() =>
                                                            decreaseQty(item.product.id)
                                                        }
                                                        className="w-8 h-8 border rounded-md  p-1 cursor-pointer"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </Button>

                                                    <span className="w-12 text-center font-medium ">
                                                        {item.quantity}
                                                    </span>

                                                    <Button
                                                        onClick={() =>
                                                            increaseQty(item.product.id)
                                                        }
                                                        className="w-8 h-8 p-1 border rounded-md cursor-pointer"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </div>


                                                <div className="text-right">
                                                    <p className="font-bold">
                                                        Rs. {(item.product.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Rs. {item.product.price} each
                                                    </p>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))
                        )}
                    </div>


                    <div>
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                            <div className="flex justify-between mb-3">
                                <span>Subtotal</span>
                                <span>Rs. {subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex flex-col gap-4 w-full">
                                <Link href="/checkout" className="w-full ">
                                    <Button className="w-full cursor-pointer ">
                                        Proceed to Checkout
                                        <ArrowRight className="w-4 h-4 ml-2 " />
                                    </Button>
                                </Link>

                                <Link href="/products" className="w-full ">
                                    <Button variant="outline" className="w-full cursor-pointer">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
