/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { useEffect } from "react";

import {
    Pill,
    Droplet,
    Baby,
    Heart,
    Stethoscope,
    Bone,
    Activity,
    Eye,
    Wind,
    Thermometer,
    Syringe,
    Badge as Bandage,
} from "lucide-react"

import {
    startCategoriesRealtime,
    type Category,
} from "../features/categoriesSlice";
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../store/index";



export default function CategoriesPage() {


    const dispatch = useDispatch<AppDispatch>();

    const { categories, loading } = useSelector((state: RootState) => state.categories);


    useEffect(() => {

        dispatch(startCategoriesRealtime());

    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50">


            <main>
                {/* Header Section */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Browse by Category</h1>
                        <p className="text-lg md:text-xl text-green-50 max-w-2xl text-pretty">
                            Find the medicines and healthcare products you need from our wide range of categories
                        </p>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map((category) => {

                            const colorlist = [
                                "bg-red-100 text-red-600",
                                "bg-orange-100 text-orange-600",
                                "bg-pink-100 text-pink-600",
                                "bg-blue-100 text-blue-600",
                                "bg-purple-100 text-purple-600",
                                "bg-green-100 text-green-600",
                                "bg-teal-100 text-teal-600",
                                "bg-cyan-100 text-cyan-600",
                                "bg-amber-100 text-amber-600",
                                "bg-indigo-100 text-indigo-600",
                                "bg-rose-100 text-rose-600",
                                "bg-yellow-100 text-yellow-600",
                            ]

                            return (
                                <Link
                                    key={category.id}
                                    href={`/products?category=${category.id}`}
                                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-green-300"
                                >
                                    <div className="p-6">
                                        <div
                                            className={`w-16 h-16 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                        >

                                            <img src={category.image} alt={category.name} className="w-8 h-8 text-white" />

                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                            {category.name}
                                        </h3>

                                        <p className="text-sm text-gray-600 mb-4 text-pretty">{category.description}</p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-500">See All Products</span>
                                            <span className="text-green-600 group-hover:translate-x-1 transition-transform duration-300">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-green-50 py-16 mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Contact our pharmacists for expert advice and assistance in finding the right medicine
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:+923001234567"
                                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                            >
                                Call Us Now
                            </a>
                            <Link
                                href="/products"
                                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors"
                            >
                                Browse All Products
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
