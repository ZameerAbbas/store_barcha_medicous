/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "../component/ui/button";

interface Product {
    id: string;
    name: string;
    price: number;
    productImage: string;
    instock: boolean;
}

interface CartItem {
    product: Product;
    quantity: number;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<any>([]);

    /* ---------------- Load Cart ---------------- */
    useEffect(() => {
        const storedCart = localStorage.getItem("bmc_cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    /* ---------------- Sync Cart ---------------- */
    const updateCart = (updatedCart: CartItem[]) => {
        setCartItems(updatedCart);
        localStorage.setItem("bmc_cart", JSON.stringify(updatedCart));
    };

    /* ---------------- Handlers ---------------- */
    const increaseQty = (id: string) => {
        const updated = cartItems.map((item: CartItem) =>
            item.product.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        updateCart(updated);
    };

    const decreaseQty = (id: string): void => {
        const updated: CartItem[] = cartItems
            .map((item: CartItem): CartItem | null =>
                item.product.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item: any): item is CartItem => item !== null && item.quantity > 0);

        updateCart(updated);
    };

    const removeItem = (id: string) => {
        const updated = cartItems.filter((item: any) => item.product.id !== id);
        updateCart(updated);
    };

    /* ---------------- Totals ---------------- */
    const subtotal = cartItems.reduce(
        (sum: any, item: any) => sum + item.product.price * item.quantity,
        0
    );



    const deliveryFee = "delivery will be calculated at checkout";


    const total = subtotal;


    // Define a type guard for CartItem
    const isCartItem = (item: CartItem | null): item is CartItem => item !== null && item.quantity > 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">{cartItems.length} items in your cart</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                                <Link href="/products">
                                    <Button>Browse Products</Button>
                                </Link>
                            </div>
                        ) : (
                            cartItems.map((item: any) => (
                                <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex gap-4">

                                        {/* Image */}
                                        <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                                            <Image
                                                src={item.product.productImage || "/placeholder.svg"}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-semibold">{item.product.name}</h3>
                                                    <span className="text-sm text-green-600">In Stock</span>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.product.id)}
                                                    className="text-gray-400 hover:text-red-600"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-center mt-4">
                                                {/* Quantity */}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => decreaseQty(item.product.id)}
                                                        className="w-8 h-8 border rounded-md"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>

                                                    <span className="w-12 text-center font-medium">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        onClick={() => increaseQty(item.product.id)}
                                                        className="w-8 h-8 border rounded-md"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Price */}
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

                    {/* Order Summary */}
                    <div>
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-4 border-b pb-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>Rs. {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery</span>
                                    <span>{deliveryFee}</span>
                                </div>
                            </div>

                            <div className="flex justify-between font-bold mb-6">
                                <span>Total</span>
                                <span>Rs. {total.toFixed(2)}</span>
                            </div>

                            <Link href="/checkout">
                                <Button className="w-full mb-3 cursor-pointer" size="lg">
                                    Proceed to Checkout
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>

                            <Link href="/products">
                                <Button variant="outline" className="w-full cursor-pointer">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
