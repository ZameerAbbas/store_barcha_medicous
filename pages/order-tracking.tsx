/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { db } from "@/firebase";

export default function OrderTrackingPage() {
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!orderId) return;

        setLoading(true);
        setError("");
        setOrder(null);

        try {

            const ordersRef = ref(db, "orders");
            const q = query(ordersRef, orderByChild("orderId"), equalTo(Number(orderId)));

            const snapshot = await get(q);

            if (snapshot.exists()) {
                const data = Object.values(snapshot.val())[0]; // get first match
                setOrder(data);
            } else {
                setError("Order not found");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "text-yellow-600";
            case "confirmed":
                return "text-blue-600";
            case "shipped":
                return "text-purple-600";
            case "delivered":
                return "text-green-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>

                <div className="flex gap-2 mb-6">
                    <input
                        type="number"
                        placeholder="Enter Order ID"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="flex-1 border p-2 rounded"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Track
                    </button>
                </div>

                {loading && <p>Checking order...</p>}
                {error && <p className="text-red-600">{error}</p>}

                {order && (
                    <div className="space-y-4">
                        <div className="border p-4 rounded bg-gray-50">
                            <p><strong>Order ID:</strong> {order.orderId}</p>
                            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <span className={`font-semibold ${getStatusColor(order.orderStatus.status)}`}>
                                    {order.orderStatus.status.toUpperCase()}
                                </span>
                            </p>
                        </div>

                        {/* Customer */}
                        <div className="border p-4 rounded">
                            <h2 className="font-semibold mb-2">Customer Info</h2>
                            <p>{order.customer.firstName} {order.customer.lastName}</p>
                            <p>{order.customer.email}</p>
                            <p>{order.customer.phone}</p>
                        </div>

                        {/* Payment */}
                        <div className="border p-4 rounded">
                            <p>Subtotal: Rs {order.subtotal}</p>
                            <p>Delivery Fee: Rs {order.deliveryFee}</p>
                            <p className="font-bold">Total: Rs {order.total}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
