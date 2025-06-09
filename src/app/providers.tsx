"use client";


import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {


    return (

        <QueryProvider>
            <AuthProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster richColors closeButton position="top-right" />
                </ThemeProvider>
            </AuthProvider>
        </QueryProvider>

    );
}