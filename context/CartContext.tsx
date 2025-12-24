/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Product {
    id: string;
    name: string;
    price: number;
    productImage: string;
    instock: boolean;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    cart: any;
    addToCart: (product: Product) => void;
    increaseQty: (productId: string) => void;
    decreaseQty: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "bmc_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem(CART_KEY);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);


    const addToCart = (product: Product) => {
        if (!product.instock) return;

        setCart(prev => {
            const index = prev.findIndex(
                item => item.product.id === product.id
            );

            if (index !== -1) {
                return prev.map((item, i) =>
                    i === index
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { product, quantity: 1 }];
        });
    };
    const increaseQty = (productId: string) => {
        setCart(prev =>
            prev.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQty = (productId: string) => {
        setCart(prev =>
            prev
                .map(item =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const removeFromCart = (productId: string) => {
        setCart(prev =>
            prev.filter(item => item.product.id !== productId)
        );
    };
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQty,
                decreaseQty,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
};
