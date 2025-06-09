"use client";

import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { coursesService } from "@/lib/courses-service/courses-service";
import { useGetAllInstructors } from "@/hooks/instructors/use-getAllInstructors";
interface Instructor {
    id: number;
    name: string;
}

const formSchema = z.object({
    name: z.string().min(3, "El título debe tener al menos 3 caracteres"),
    type: z.enum(["TEORICO", "PRACTICO"], {
        errorMap: () => ({ message: "Tipo de curso inválido" }),
    }),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
    durationHours: z.string().regex(/^\d+$/, "La duración debe ser un número entero y mayor a 0"),
    instructorId: z.string().min(1, "Debes seleccionar un instructor").optional(),
});

type FormData = z.infer<typeof formSchema>;

export function CourseForm() {


    const { data: intructors, isLoading: loading } = useGetAllInstructors(); // Asumiendo que tienes un servicio para obtener los instructores

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "TEORICO", // Valor por defecto
            description: "",
            durationHours: "",
            instructorId: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        try {

            const courseData = {
                name: data.name,
                type: data.type,
                description: data.description,
                durationHours: parseInt(data.durationHours, 10),
                instructorId: +(data.instructorId ?? "0"),
            };

            await coursesService.createCourse(courseData);
            console.log("Curso creado:", courseData);
            alert("Curso creado exitosamente");
            form.reset(); // Resetea el formulario después de crear el curso
        }

        catch (error) {
            console.error("Error al crear el curso:", error);
            alert("Ha ocurrido un error al crear el curso");
        }
    }



    return (
        <Card className="max-w-2xl mx-auto mt-10 p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                    <FormLabel className="text-base">Título del Curso</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Título del curso"
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
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Tipo de Curso</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-10">
                                                <SelectValue placeholder="Selecciona el tipo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="TEORICO">Teórico</SelectItem>
                                            <SelectItem value="PRACTICO">Práctico</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Duración - 1 columna */}
                        <FormField
                            control={form.control}
                            name="durationHours"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Duración (horas)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Ej: 40"
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
                            name="instructorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Instructor</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-10">
                                                <SelectValue placeholder="Selecciona instructor" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>                                            
                                            {loading ? (
                                            <SelectItem value="loading" disabled={loading}>Cargando instructores...</SelectItem>
                                        ) : (
                                            intructors?.map((instructor: { id: number; name: string }) => (
                                                <SelectItem
                                                    key={instructor.id}
                                                    value={instructor.id.toString()}
                                                >
                                                    {instructor.name}
                                                </SelectItem>
                                            ))
                                        )}

                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-1 sm:col-span-2 lg:col-span-3">
                                    <FormLabel className="text-base">Descripción del curso</FormLabel>
                                    <FormControl>
                                        <div className="grid w-full gap-2">
                                            <Textarea
                                                placeholder="Describe el contenido y objetivos del curso..."
                                                {...field}
                                                className="min-h-[120px] resize-y"
                                            />
                                            <p className="text-muted-foreground text-sm">
                                                Proporciona una descripción detallada del curso y sus objetivos.
                                            </p>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Botón de submit centrado y responsive */}
                    <div className="flex justify-center mt-8">
                        <Button
                            type="submit"
                            className="w-full sm:w-auto min-w-[200px] h-10 dark:text-white"
                        >
                            Crear Curso
                        </Button>
                    </div>
                </form>
            </Form>
        </Card>
    );
}