"use client"

import { useAuth } from "@/context/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export function RedirectAuthenticated({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Solo redirigir si estamos en una ruta de auth y estamos autenticados
        if (isAuthenticated && pathname.startsWith('/auth')) {
            router.replace("/dashboard")
        }
    }, [isAuthenticated, router, pathname])

    // En lugar de retornar null, podríamos mostrar un loader
    if (isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-pulse">Redirigiendo...</div>
            </div>
        )
    }

    return <>{children}</>
}
