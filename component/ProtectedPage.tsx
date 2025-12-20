// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { useAuth } from "../context/AuthContext";
// // import { useRouter } from "next/router";
// // import { JSX, useEffect } from "react";

// // export default function ProtectedPage({
// //     children,
// //     redirectTo = "/login",
// // }: {
// //     children: JSX.Element;
// //     redirectTo?: string;
// // }) {
// //     const { user, loading } = useAuth();
// //     const router = useRouter();

// //     useEffect(() => {
// //         if (!loading && !user) {
// //             router.replace(`${redirectTo}?next=${router.asPath}`);
// //         }
// //     }, [user, loading]);

// //     if (loading || !user) return null;

// //     return children;
// // }

// "use client"

// import type React from "react"
// import { useEffect } from "react"
// import { useRouter, usePathname, useSearchParams } from "next/navigation"
// import { useAuth } from "../context/AuthContext"

// export default function ProtectedPage({
//     children,
//     redirectTo = "/login",
// }: {
//     children: React.ReactNode
//     redirectTo?: string
// }) {
//     const { user, loading } = useAuth()
//     const router = useRouter()
//     const pathname = usePathname()
//     const searchParams = useSearchParams()

//     useEffect(() => {
//         if (!loading && !user && pathname !== redirectTo) {
//             const currentPath =
//                 pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")

//             router.replace(`${redirectTo}?next=${encodeURIComponent(currentPath)}`)
//         }
//     }, [user, loading, router, redirectTo, pathname, searchParams])

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//                     <p className="text-gray-600">Loading...</p>
//                 </div>
//             </div>
//         )
//     }

//     if (!user) return null

//     return <>{children}</>
// }


"use client"

import type React from "react"

import { useAuth } from "../context/AuthContext"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedPage({
    children,
    redirectTo = "/login",
}: {
    children: React.ReactNode
    redirectTo?: string
}) {
    const { user, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (!loading && !user) {
            const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
            router.replace(`${redirectTo}?next=${encodeURIComponent(currentPath)}`)
        }
    }, [user, loading, router, redirectTo, pathname, searchParams])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return <>{children}</>
}
