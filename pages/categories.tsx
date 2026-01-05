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

const categoriesStatic = [
    {
        name: "Pain Relief",
        slug: "pain-relief",
        description: "Paracetamol, Ibuprofen, Aspirin and more",
        icon: Pill,
        color: "bg-red-100 text-red-600",
        productCount: 45,
    },
    {
        name: "Vitamin & Supplements",
        slug: "vitamin-supplements",
        description: "Essential vitamins and dietary supplements",
        icon: Droplet,
        color: "bg-orange-100 text-orange-600",
        productCount: 68,
    },
    {
        name: "Baby Care",
        slug: "baby-care",
        description: "Diapers, baby food, and care products",
        icon: Baby,
        color: "bg-pink-100 text-pink-600",
        productCount: 52,
    },
    {
        name: "Antibiotics",
        slug: "antibiotics",
        description: "Prescription antibiotics for infections",
        icon: Syringe,
        color: "bg-blue-100 text-blue-600",
        productCount: 34,
    },
    {
        name: "Medical Devices",
        slug: "medical-devices",
        description: "Thermometers, BP monitors, glucometers",
        icon: Stethoscope,
        color: "bg-purple-100 text-purple-600",
        productCount: 28,
    },
    {
        name: "First Aid",
        slug: "first-aid",
        description: "Bandages, antiseptics, wound care",
        icon: Bandage,
        color: "bg-green-100 text-green-600",
        productCount: 41,
    },
    {
        name: "Skin Care",
        slug: "skin-care",
        description: "Creams, lotions, and skincare products",
        icon: Heart,
        color: "bg-teal-100 text-teal-600",
        productCount: 56,
    },
    {
        name: "Respiratory Care",
        slug: "respiratory-care",
        description: "Inhalers, nebulizers, cough syrups",
        icon: Wind,
        color: "bg-cyan-100 text-cyan-600",
        productCount: 39,
    },
    {
        name: "Orthopedic",
        slug: "orthopedic",
        description: "Supports, braces, mobility aids",
        icon: Bone,
        color: "bg-amber-100 text-amber-600",
        productCount: 22,
    },
    {
        name: "Eye Care",
        slug: "eye-care",
        description: "Eye drops, contact lens solutions",
        icon: Eye,
        color: "bg-indigo-100 text-indigo-600",
        productCount: 31,
    },
    {
        name: "Diabetes Care",
        slug: "diabetes-care",
        description: "Insulin, test strips, glucose monitors",
        icon: Activity,
        color: "bg-rose-100 text-rose-600",
        productCount: 27,
    },
    {
        name: "Fever & Flu",
        slug: "fever-flu",
        description: "Cold remedies, fever reducers",
        icon: Thermometer,
        color: "bg-yellow-100 text-yellow-600",
        productCount: 43,
    },
]

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
                        {categoriesStatic.map((category) => {
                            const IconComponent = category.icon
                            return (
                                <Link
                                    key={category.slug}
                                    href={`/products?category=${category.slug}`}
                                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-green-300"
                                >
                                    <div className="p-6">
                                        <div
                                            className={`w-16 h-16 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <IconComponent className="w-8 h-8" />
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
