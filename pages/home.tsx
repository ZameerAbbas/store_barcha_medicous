/* eslint-disable react/no-unescaped-entities */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */

import { Button } from "../component/ui/button"
import { Card, CardContent } from "../component/ui/card"
import { Badge } from "../component/ui/badge"

import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../store/index";
import {
    Truck,
    MapPin,
    Clock,
    ShieldCheck,
    Pill,
    Stethoscope,
    Heart,
    Phone,
    Star,
    Package,
    CheckCircle2,
    ArrowRight,
    Award,
    HeadphonesIcon,
    ChevronRight,
    ThermometerIcon,
    BadgeIcon as BandageIcon,
    Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import {
    startCategoriesRealtime,

    type Category,
} from "../features/categoriesSlice";

import {
    startProductsRealtime,

    Product
} from "../features/productsSlice";
import { useEffect } from "react";


export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>();

    const { categories } = useSelector((state: RootState) => state.categories);
    const { products, loading: productsLoading } = useSelector((state: RootState) => state.products);





    useEffect(() => {

        dispatch(startCategoriesRealtime());
        dispatch(startProductsRealtime());

    }, [dispatch]);

    console.log("categories", categories)


    // Sort products by totalSold descending and get top 5
    const top5Products = [...products]
        .sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0))
        .slice(0, 4);


    return (
        <div className="min-h-screen">


            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
                <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-16 lg:pt-28 lg:pb-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <Badge variant="secondary" className="text-sm font-medium px-4 py-1.5 w-fit">
                                    <Award className="w-3.5 h-3.5 mr-2" />
                                    Gilgit's Most Trusted Medical Store Since 2010
                                </Badge>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                                    Your Health,{" "}
                                    <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                        Our Priority
                                    </span>
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-xl text-pretty">
                                    Authentic medicines delivered to your doorstep in Gilgit. Licensed pharmacy with 6 convenient
                                    locations and 24/7 emergency services.
                                </p>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-500/10 p-2 rounded-full">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">100% Genuine</div>
                                        <div className="text-xs text-muted-foreground">Licensed Products</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-500/10 p-2 rounded-full">
                                        <Truck className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">Fast Delivery</div>
                                        <div className="text-xs text-muted-foreground">Within 2 Hours</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-amber-500/10 p-2 rounded-full">
                                        <Star className="w-5 h-5 text-amber-600 dark:text-amber-500 fill-amber-600 dark:fill-amber-500" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">4.9/5 Rating</div>
                                        <div className="text-xs text-muted-foreground">2000+ Reviews</div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" asChild className="text-base shadow-lg shadow-primary/25 h-12">
                                    <Link href="/products">
                                        <Package className="w-5 h-5 mr-2" />
                                        Order Medicine Now
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    asChild
                                    className="text-base h-12 border-2 bg-background "
                                >
                                    <a href="tel:+923001234567">
                                        <Phone className="w-5 h-5 mr-2" />
                                        Emergency: 0300-1234567
                                    </a>
                                </Button>
                            </div>

                            {/* Quick Info */}
                            <div className="pt-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    <span>Free delivery on orders above Rs. 2000</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Image */}
                        <div className="relative lg:h-[600px]">
                            <div className="relative h-[400px] lg:h-full rounded-3xl overflow-hidden border-8 border-background shadow-2xl">
                                <Image
                                    src="/modern-pharmacy-interior-with-medical-supplies.jpg"
                                    alt="BMC Medical Store - Professional Pharmacy Interior"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -left-4 sm:left-8 bg-background border-2 border-primary/20 rounded-2xl p-5 shadow-2xl max-w-[200px]">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary rounded-xl p-3">
                                        <Package className="w-7 h-7 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-primary">10K+</div>
                                        <div className="text-sm text-muted-foreground">Products</div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden lg:block absolute -top-6 -right-4 bg-background border-2 border-green-500/20 rounded-2xl p-4 shadow-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-500 rounded-full p-2">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground">Available 24/7</div>
                                        <div className="font-semibold">Always Open</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 border-y bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Truck,
                                title: "Fast Delivery",
                                description: "2-hour delivery across Gilgit",
                                color: "blue",
                            },
                            {
                                icon: ShieldCheck,
                                title: "100% Authentic",
                                description: "Genuine licensed medicines",
                                color: "green",
                            },
                            {
                                icon: MapPin,
                                title: "6 Branches",
                                description: "Conveniently located in Gilgit",
                                color: "purple",
                            },
                            {
                                icon: HeadphonesIcon,
                                title: "24/7 Support",
                                description: "Always here to help you",
                                color: "amber",
                            },
                        ].map((feature, index) => {
                            const Icon = feature.icon
                            const colorClasses = {
                                blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                                green: "bg-green-500/10 text-green-600 dark:text-green-400",
                                purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                                amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                            } as const

                            type ColorKey = keyof typeof colorClasses;
                            return (
                                <Card key={index} className="border-2 hover:border-primary/50 hover:shadow-lg transition-all">
                                    <CardContent className="pt-6 pb-6">
                                        <div className="flex flex-col items-center text-center space-y-3">
                                            <div className={`${colorClasses[feature.color as ColorKey]} p-4 rounded-2xl`}>
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Popular Products Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 space-y-3">
                        <Badge variant="secondary" className="mb-2">
                            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                            Best Sellers
                        </Badge>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Popular This Month</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Most trusted medicines chosen by thousands of customers
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {top5Products.map((product: Product, index) => (
                            <Card
                                key={index}
                                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden"
                            >
                                <CardContent className="p-0">
                                    <div className="relative aspect-square overflow-hidden bg-muted">
                                        <Image
                                            src={product.productImage || "/placeholder.svg"}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <Badge className="absolute top-3 left-3 bg-primary shadow-lg">{product.brandId}</Badge>
                                        {product.instock && (
                                            <div className="absolute bottom-3 right-3 bg-green-500 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                In Stock
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">{categories.find((v) => v.id === product.categoryId)?.name}</p>
                                            <h3 className="font-semibold leading-tight mb-2">{product.name}</h3>
                                            <div className="flex items-center gap-1 mb-2">
                                                <p >Mg:</p>
                                                <span className="text-sm font-medium">{product.mg
                                                }</span>
                                            </div>
                                            <p className="text-xl font-bold text-primary">Rs:{product.price}</p>
                                        </div>
                                        <Button size="sm" className="w-full">
                                            <Package className="w-4 h-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Button size="lg" variant="outline" asChild className="border-2 bg-transparent">
                            <Link href="/products">
                                View All Products
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Shop by Category */}
            <section className="py-20 px-4 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 space-y-3">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Shop by Category</h2>
                        <p className="text-muted-foreground text-lg">Find exactly what you need</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {

                            // [
                            //     {
                            //         icon: Pill,
                            //         name: "Pain Relief",
                            //         count: "200+ items",
                            //         color: "red",
                            //         href: "/products",
                            //     },
                            //     {
                            //         icon: Heart,
                            //         name: "Vitamins",
                            //         count: "150+ items",
                            //         color: "pink",
                            //         href: "/products",
                            //     },
                            //     {
                            //         icon: ThermometerIcon,
                            //         name: "Medical Devices",
                            //         count: "80+ items",
                            //         color: "blue",
                            //         href: "/products",
                            //     },
                            //     {
                            //         icon: BandageIcon,
                            //         name: "First Aid",
                            //         count: "120+ items",
                            //         color: "green",
                            //         href: "/products",
                            //     },
                            //     {
                            //         icon: Stethoscope,
                            //         name: "Baby Care",
                            //         count: "90+ items",
                            //         color: "purple",
                            //         href: "/products",
                            //     },
                            //     {
                            //         icon: Pill,
                            //         name: "Antibiotics",
                            //         count: "110+ items",
                            //         color: "amber",
                            //         href: "/products",
                            //     },
                            //     {
                            //         icon: Heart,
                            //         name: "Skin Care",
                            //         count: "130+ items",
                            //         color: "indigo",
                            //         href: "/products",
                            //     },
                            //     {
                            //         icon: Pill,
                            //         name: "Respiratory",
                            //         count: "75+ items",
                            //         color: "cyan",
                            //         href: "/products",
                            //     },
                            // ]

                            categories.map((category, index) => {
                                const Icon = category.image
                                const colorClasses = {
                                    red: "from-red-500 to-red-600",
                                    pink: "from-pink-500 to-pink-600",
                                    blue: "from-blue-500 to-blue-600",
                                    green: "from-green-500 to-green-600",
                                    purple: "from-purple-500 to-purple-600",
                                    amber: "from-amber-500 to-amber-600",
                                    indigo: "from-indigo-500 to-indigo-600",
                                    cyan: "from-cyan-500 to-cyan-600",
                                } as const
                                return (
                                    <Link key={index} href={`/category/${category.id}`}>
                                        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 overflow-hidden h-full">
                                            <CardContent className="p-6 text-center space-y-4">
                                                <div
                                                    className={`bg-gradient-to-br ${colorClasses[category.color as keyof typeof colorClasses]} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg`}
                                                >

                                                    <div>
                                                        <img src={category.image} alt={category.name} className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-base mb-1">{category.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{category.description}</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 mx-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </CardContent>
                                        </Card>
                                    </Link>
                                )
                            })}
                    </div>
                </div>
            </section>

            {/* Our Branches */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 space-y-3">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Visit Our Branches</h2>
                        <p className="text-muted-foreground text-lg">6 convenient locations across Gilgit</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Jutial Main Branch",
                                address: "Jutial Road, Near City Park, Gilgit",
                                hours: "Open 24/7",
                                phone: "+92 300 1234567",
                                isMain: true,
                            },
                            {
                                name: "Danyor Branch",
                                address: "Danyor Market, Main KKH Road, Gilgit",
                                hours: "8:00 AM - 10:00 PM",
                                phone: "+92 300 1234568",
                            },
                            {
                                name: "Kashrote Branch",
                                address: "Kashrote Chowk, Gilgit City",
                                hours: "8:00 AM - 10:00 PM",
                                phone: "+92 300 1234569",
                            },
                            {
                                name: "Konodas Branch",
                                address: "Konodas Road, Gilgit",
                                hours: "9:00 AM - 9:00 PM",
                                phone: "+92 300 1234570",
                            },
                            {
                                name: "Airport Road Branch",
                                address: "Near Airport Road, Gilgit",
                                hours: "8:00 AM - 11:00 PM",
                                phone: "+92 300 1234571",
                            },
                            {
                                name: "Barmas Branch",
                                address: "Barmas Market, Gilgit",
                                hours: "8:00 AM - 10:00 PM",
                                phone: "+92 300 1234572",
                            },
                        ].map((branch, index) => (
                            <Card key={index} className="border-2 hover:border-primary/50 hover:shadow-lg transition-all relative">
                                {branch.isMain && (
                                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary shadow-lg">Main Branch</Badge>
                                )}
                                <CardContent className="pt-8 pb-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg mb-1">{branch.name}</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{branch.address}</p>
                                            </div>
                                        </div>
                                        <div className="pl-15 space-y-2 pt-2 border-t">
                                            <div className="flex items-center gap-3 text-sm">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                <span className={branch.hours.includes("24/7") ? "font-semibold text-primary" : ""}>
                                                    {branch.hours}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Phone className="w-4 h-4 text-muted-foreground" />
                                                <a href={`tel:${branch.phone}`} className="text-primary hover:underline font-medium">
                                                    {branch.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 space-y-3">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">What Our Customers Say</h2>
                        <p className="text-muted-foreground text-lg">Trusted by thousands in Gilgit</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Ahmed Khan",
                                location: "Jutial, Gilgit",
                                comment:
                                    "BMC has been our family's trusted pharmacy for years. They delivered my father's urgent heart medication at midnight within 30 minutes. Outstanding service!",
                                rating: 5,
                                date: "2 days ago",
                            },
                            {
                                name: "Fatima Ali",
                                location: "Danyor, Gilgit",
                                comment:
                                    "Very professional staff who take time to explain medication properly. Prices are reasonable and they always have stock. Highly recommended!",
                                rating: 5,
                                date: "1 week ago",
                            },
                            {
                                name: "Hassan Malik",
                                location: "Kashrote, Gilgit",
                                comment:
                                    "The best medical store in Gilgit! Fast delivery, genuine medicines, and helpful pharmacists. I only trust BMC for my family's health needs.",
                                rating: 5,
                                date: "3 weeks ago",
                            },
                        ].map((testimonial, index) => (
                            <Card key={index} className="border-2 hover:shadow-lg transition-all">
                                <CardContent className="pt-6 pb-6 space-y-4">
                                    <div className="flex gap-1">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{testimonial.comment}</p>
                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <div>
                                            <div className="font-semibold">{testimonial.name}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                                        </div>
                                        <div className="text-xs text-muted-foreground">{testimonial.date}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <Card className="border-2 border-primary/20 overflow-hidden">
                        <CardContent className="p-8 md:p-12">
                            <div className="text-center space-y-6">
                                <div className="space-y-3">
                                    <h2 className="text-3xl md:text-4xl font-bold">Need Medicine Urgently?</h2>
                                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                        Order now and get your medicines delivered to your doorstep within 2 hours. Available 24/7 for
                                        emergencies.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                    <Button size="lg" asChild className="text-base shadow-lg shadow-primary/25 h-12">
                                        <Link href="/products">
                                            <Package className="w-5 h-5 mr-2" />
                                            Browse Products
                                        </Link>
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        asChild
                                        className="text-base h-12 border-2 bg-background"
                                    >
                                        <a href="tel:+923001234567">
                                            <Phone className="w-5 h-5 mr-2" />
                                            Call: 0300-1234567
                                        </a>
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground pt-4">
                                    <CheckCircle2 className="w-4 h-4 inline text-green-600 mr-1" />
                                    Free delivery on orders above Rs. 2000
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}

        </div>
    )
}
