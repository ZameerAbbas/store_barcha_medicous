

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
