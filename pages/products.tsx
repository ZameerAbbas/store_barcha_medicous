/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../store/index";
import {
    startProductsRealtime,

    Product
} from "../features/productsSlice";
import {
    startBrandRealtime,
    type BrandOrder,
} from "../features/brandSlice";

import {
    startCategoriesRealtime,

    type Category,
} from "../features/categoriesSlice";




import { ChevronDown } from "lucide-react"
import { useCart } from "../context/CartContext";
import ProductCardSkeleton from "@/component/ProductCardSkeleton";





export default function ProductsPage() {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [inStockOnly, setInStockOnly] = useState(false)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const ITEMS_PER_PAGE = 2;

    const [currentPage, setCurrentPage] = useState(1);


    console.log("selectedBrands", selectedBrands)


    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState("relevance")

    const { addToCart } = useCart();



    const toggleBrand = (brand: string) => {
        setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
    }

    const dispatch = useDispatch<AppDispatch>();
    const { products, loading: productsLoading } = useSelector((state: RootState) => state.products);
    const { brandOrders } = useSelector((state: RootState) => state.brand);
    const { categories } = useSelector((state: RootState) => state.categories);


    useEffect(() => {
        dispatch(startProductsRealtime());
        dispatch(startBrandRealtime());
        dispatch(startCategoriesRealtime());

    }, [dispatch]);


    useEffect(() => {
        setCurrentPage(1);
    }, [products,
        search,
        selectedCategory,
        selectedBrands,
        sortBy,]);



    const filteredProducts = useMemo(() => {
        let list = [...products];

        // 🔍 Search
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                p =>
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q)
            );
        }

        // 🏷 Category filter
        if (selectedCategory) {
            list = list.filter(
                p => p.categoryId === selectedCategory
            );
        }

        // 🏷 Brand filter
        if (selectedBrands.length > 0) {
            list = list.filter(p =>
                selectedBrands.includes(p.brandId)
            );
        }

        // ↕ Sort
        switch (sortBy) {
            case "priceLow":
                list.sort((a, b) => a.price - b.price);
                break;

            case "priceHigh":
                list.sort((a, b) => b.price - a.price);
                break;

            case "nameAZ":
                list.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;
        }

        return list;
    }, [
        products,
        search,
        selectedCategory,
        selectedBrands,
        sortBy,
    ]);



    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return filteredProducts.slice(start, end);
    }, [filteredProducts, currentPage]);




    const handleAddToCart = (product: any) => {
        addToCart(product);
    };


    return (
        <div className="min-h-screen bg-gray-50">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile Filter Toggle */}
                    <button
                        className="lg:hidden mb-4 px-4 py-2 bg-white border rounded-lg font-medium"
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    >
                        {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
                    </button>

                    {/* Sidebar Filters */}
                    <aside className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block w-full lg:w-64 space-y-6`}>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-6">Filters</h2>

                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Categories</h3>
                                <div className="space-y-1">
                                    {categories?.slice(0, 8)?.map((category: any) => (
                                        <div key={category.name}>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`flex items-center justify-between w-full  cursor-pointer   text-left py-1 hover:text-green-600 ${selectedCategory === category.id ? "text-green-600 font-medium" : "text-gray-700"
                                                    }`}
                                            >
                                                <span className="text-sm">{category.name}</span>
                                            </button>


                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Brand */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Brand</h3>
                                <div className="space-y-2">
                                    {brandOrders?.slice(0, 8)?.map((brand) => (
                                        <label key={brand.brand} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand.brand)}
                                                onChange={() => toggleBrand(brand.brand)}
                                                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                                            />
                                            <span className="text-sm">{brand.brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            {/* <div className="mb-6">
                                <h3 className="font-semibold mb-3">Price Range</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <input type="number" placeholder="Rs. 10" className="w-full px-3 py-2 border rounded-lg text-sm" />
                                        <span>-</span>
                                        <input
                                            type="number"
                                            placeholder="Rs. 5000"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button className="px-3 py-1 text-xs border rounded-full hover:bg-gray-100">Under Rs. 100</button>
                                        <button className="px-3 py-1 text-xs border rounded-full hover:bg-gray-100">Rs. 100-500</button>
                                        <button className="px-3 py-1 text-xs border rounded-full hover:bg-gray-100">Over Rs. 500</button>
                                    </div>
                                </div>
                            </div> */}

                            {/* Availability */}
                            {/* <div>
                                <h3 className="font-semibold mb-3">Availability</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={inStockOnly}
                                            onChange={(e) => setInStockOnly(e.target.checked)}
                                            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                                        />
                                        <span className="text-sm">In Stock</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
                                        <span className="text-sm">Out of Stock</span>
                                    </label>
                                </div>
                            </div> */}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                            <h1 className="text-2xl font-bold mb-4 sm:mb-0">All Products ({products.length})</h1>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    Showing {ITEMS_PER_PAGE} of {products.length} products
                                </span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 border rounded-lg text-sm"
                                >
                                    <option value="relevance">Relevance</option>
                                    <option value="priceLow">Price: Low to High</option>
                                    <option value="priceHigh">Price: High to Low</option>
                                    <option value="nameAZ">Name: A to Z</option>
                                </select>

                            </div>
                        </div>
                        <div className="my-2">


                            <input
                                type="text"
                                placeholder="Search medicines..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            />
                        </div>


                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {productsLoading
                                ? Array.from({ length: 8 }).map((_, index) => (
                                    <ProductCardSkeleton key={index} />
                                ))
                                : paginatedProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                    >
                                        <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
                                            <img
                                                src={product.productImage}
                                                alt={product.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div className="p-4">
                                            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                                                {product.name.slice(0, 14)}
                                            </h3>

                                            <p className="text-lg font-bold text-gray-900 mb-2">
                                                Rs. {product.price.toFixed(2)}
                                            </p>

                                            <span
                                                className={`inline-block px-2 py-1 text-xs rounded mb-3 ${product.instock
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {product.instock ? "In Stock" : "Out of Stock"}
                                            </span>

                                            <button
                                                disabled={!product.instock}
                                                onClick={() => handleAddToCart(product)}
                                                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${product.instock
                                                    ? "bg-gray-900 text-white hover:bg-gray-800"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    }`}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>


                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2 mt-8">

                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                    className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                                >
                                    ←
                                </button>


                                {Array.from({ length: totalPages }).map((_, index) => {
                                    const page = index + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-4 py-2 rounded ${currentPage === page
                                                ? "bg-gray-900 text-white"
                                                : "border hover:bg-gray-100"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}


                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                    className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                                >
                                    →
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
