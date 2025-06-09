"use client"

import { useAuth } from "@/context/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Solo redirigir si estamos en una ruta protegida y no estamos autenticados
        if (!isAuthenticated && pathname.startsWith('/dashboard')) {
            router.replace("/auth/login")
        }
    }, [isAuthenticated, router, pathname])

    // En lugar de retornar null, podríamos mostrar un loader
    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-pulse">Cargando...</div>
            </div>
        )
    }

    return <>{children}</>
}
