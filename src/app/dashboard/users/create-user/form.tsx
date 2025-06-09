"use client";

import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateUserForm } from "@/components/users/form/create-user-form";

const formSchema = z.object({
    user: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),   
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    role: z.enum(["STUDENT", "INSTRUCTOR"], {
        errorMap: () => ({ message: "Rol inválido" }),
    }),


});

type FormData = z.infer<typeof formSchema>;

export function UserForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user: "",
            email: "",
            password: "",
            role: "STUDENT", // Valor por defecto
        },
    });

    return (
        <Card className="max-w-2xl mx-auto mt-10 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Crear Usuario</h2>
            <Form {...form}>
                <CreateUserForm />
            </Form>
        </Card>
    );
}