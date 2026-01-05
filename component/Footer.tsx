import { Phone, MapPin, Clock } from "lucide-react"
import Link from "next/link"

import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../store/index";
import {
    startCategoriesRealtime,

    type Category,
} from "../features/categoriesSlice";
import { useEffect } from "react";



const Footerpage = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { categories } = useSelector((state: RootState) => state.categories);



    useEffect(() => {

        dispatch(startCategoriesRealtime());

    }, [dispatch]);

    console.log("categories", categories)
    return (
        <footer className="bg-muted/50 border-t py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">BMC Medical Store</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your trusted pharmacy since 2010, providing quality healthcare products and services across Gilgit.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                                    Shop Products
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Our Branches
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Categories</h4>
                        {categories
                            ?.slice(0, 3)
                            .map((v) =>
                                v.id ? (
                                    <ul key={v.id} className="space-y-2 text-sm">
                                        <li>
                                            <Link
                                                href={`/category/${v.id}`}
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                {v.name}
                                            </Link>
                                        </li>
                                    </ul>
                                ) : null
                            )}

                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <Phone className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <a href="tel:+923001234567" className="text-muted-foreground hover:text-primary transition-colors">
                                    +92 300 1234567
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">Jutial Road, Gilgit, Pakistan</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">Open 24/7</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>© 2025 BMC Medical Store. All rights reserved. Licensed Pharmacy in Gilgit, Pakistan.</p>
                </div>
            </div>
        </footer>)
}
export default Footerpage;