"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { usersService } from "@/lib/users-service/users-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    user: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    role: z.enum(["INSTRUCTOR", "STUDENT"], {
        errorMap: () => ({ message: "Rol inválido" }),
    }),
});

type FormData = z.infer<typeof formSchema>;

export function CreateUserForm() {
    const router = useRouter();     
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user: "",
            email: "",
            password: "",
            role: "STUDENT",
        },
    });

    const createUserMutation = useMutation({
        mutationFn: usersService.createUser,
        onSuccess: () => {
            toast.success("Usuario creado exitosamente");
            router.push("/dashboard/users");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Ha ocurrido un error al crear el usuario");
        },
    });

    async function onSubmit(values: FormData) {
        createUserMutation.mutate(values);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                <FormField
                    control={form.control}
                    name="user"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel className="text-base">Nombre del usuario</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ingrese el nombre del usuario"
                                    {...field}
                                    className="h-10"
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
                        <FormItem className="">
                            <FormLabel className="text-base">Correo electrónico</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    {...field}
                                    className="h-10"
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
                        <FormItem className="">
                            <FormLabel className="text-base">Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Ingrese la contraseña"
                                    {...field}
                                    className="h-10"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Rol del usuario</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Selecciona el rol" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                                    <SelectItem value="STUDENT">Estudiante</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex justify-center mt-8">
                <Button
                    type="submit"
                    className="w-full sm:w-auto min-w-[200px] h-10 dark:text-white"
                    disabled={createUserMutation.isPending}
                >
                    {createUserMutation.isPending ? "Creando..." : "Crear Usuario"}
                </Button>
            </div>
        </form>
    );
}