"use client"

import { LoginForm } from "@/components/auth/login/login-form"
import { RedirectAuthenticated } from "@/components/auth/redirect-authenticated"
import { BookOpenTextIcon } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
    return (
        <RedirectAuthenticated>
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <a href="#" className="flex items-center gap-2 font-medium">
                            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                <BookOpenTextIcon className="size-4 text-amber-50" />
                            </div>
                            Driving Academy.
                        </a>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <LoginForm />
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-center lg:bg-muted/50">
                    <div className="mx-auto w-full max-w-md">
                        <Image
                            src="/vercel.svg"
                            alt="Conducción segura"
                            width={80}
                            height={80}
                            priority
                            className="aspect-square w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </RedirectAuthenticated>
    )
}
