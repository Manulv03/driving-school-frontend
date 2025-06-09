"use client"

import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

import { Course } from "@/types/courses/courses-types";
import { useGetAllCoursesByStudent } from "@/hooks/courses/use-getCoursesByStudent";
import { registerCourse } from "@/lib/student/student-service";

export const formSchema = z.object({
    courseId: z.string().min(1, "Debes seleccionar un curso"),
});

type FormData = z.infer<typeof formSchema>;

export function AddClassForm() {
    const { user } = useAuth();
    const { data: courses, isLoading: loading } = useGetAllCoursesByStudent();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            courseId: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        const userEmail = user?.email;
        if (!userEmail) {
            alert('Usuario no encontrado');
            return;
        }

        try {
            const registerData = {
                courseId: data.courseId,
                email: userEmail,
            };
            await registerCourse(registerData);
            console.log("Datos del formulario:", { data, userEmail });
            alert(`Clase agregada exitosamente al curso con ID: ${data.courseId} para el usuario: ${userEmail}`);
        } catch (error) {
            console.error("Error al agregar la clase:", error);
            alert("Error al agregar la clase. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    return (
        <Card className="p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="courseId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Curso</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un curso" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {loading ? (
                                            <SelectItem value="loading" disabled>
                                                Cargando cursos...
                                            </SelectItem>
                                        ) : courses?.length === 0 ? (
                                            <SelectItem value="no-courses" disabled>
                                                No hay cursos disponibles
                                            </SelectItem>
                                        ) : (courses?.map((course: Course) => {
                                            // Asegurarse de que el curso tenga un id válido
                                            if (!course.id) return null;
                                            return (
                                                <SelectItem
                                                    key={course.id}
                                                    value={course.id.toString()}
                                                >
                                                    {course.name}
                                                </SelectItem>
                                            );
                                        })
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Agregar Clase</Button>
                </form>
            </Form>
        </Card>
    );
}