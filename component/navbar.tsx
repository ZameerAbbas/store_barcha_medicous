"use client"

import Link from "next/link"
import { Search, ShoppingCart, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="border-b bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xl">BMC</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-900 hover:text-green-600 font-medium">
                            Home
                        </Link>
                        <Link href="/products" className="text-gray-900 hover:text-green-600 font-medium">
                            Products
                        </Link>
                        <Link href="/categories" className="text-gray-900 hover:text-green-600 font-medium">
                            Categories
                        </Link>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search medicines..."
                                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="relative hover:text-green-600">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                0
                            </span>
                        </button>
                        <Link href="/login" className="text-gray-900 hover:text-green-600 font-medium">
                            Login / Signup
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden pb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search medicines..."
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-white">
                    <div className="px-4 py-4 space-y-3">
                        <Link href="/" className="block py-2 text-gray-900 hover:text-green-600 font-medium">
                            Home
                        </Link>
                        <Link href="/products" className="block py-2 text-gray-900 hover:text-green-600 font-medium">
                            Products
                        </Link>
                        <Link href="/categories" className="block py-2 text-gray-900 hover:text-green-600 font-medium">
                            Categories
                        </Link>
                        <div className="flex items-center justify-between pt-2 border-t">
                            <button className="relative hover:text-green-600">
                                <ShoppingCart className="w-6 h-6" />
                                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    0
                                </span>
                            </button>
                            <Link href="/login" className="text-gray-900 hover:text-green-600 font-medium">
                                Login / Signup
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
