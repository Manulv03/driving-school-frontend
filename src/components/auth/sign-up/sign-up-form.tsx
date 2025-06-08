"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useAuth } from "@/context/auth-context"
import { authService } from "@/lib/auth"

const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export function SignUpForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      setError("")
      
      // Primero registramos al usuario
      const response = await authService.register(
        data.username,
        data.email,
        data.password
      )
      
      // Si el registro es exitoso, iniciamos sesión automáticamente
      await login(data.email, data.password)
      
      // Redirigimos al dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error al registrar:", error)
      setError("Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm animate-zoom-in">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Registrate</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico y contraseña para crear una cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder=" "
                      {...field}
                      className="w-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder=" "
                      {...field}
                      type="email"
                      className="w-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder=" "
                      {...field}
                      type="password"
                      className="w-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="flex flex-row items-center justify-center gap-2 pb-6">
        <p>¿Ya tienes cuenta?</p>{" "}
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          Inicia sesión
        </Link>
      </div>
    </Card>
  )
}