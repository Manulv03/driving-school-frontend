import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Course } from "@/types/courses/courses-types";
import { Instructor } from "@/types/instructor/instructor-types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";


export const INSTRUCTORS_COLUMNS: ColumnDef<Instructor>[] = [
    {
        id: "actions",
        header: "Opciones",
        cell: ({ row }) => {
            const insuruance = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 cursor-pointer bg-neutral-50 dark:bg-neutral-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md"
                        >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(insuruance.id.toString())
                            }
                        >
                            Copiar ID del instructor
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => alert("Hola como vas?")}>
                            View customer
                        </DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        accessorKey: "id",
        header: "ID del Instructor",
        cell: ({ row }) => <div className="">{row.original.id}</div>,
    },
    {
        accessorKey: "name",
        header: "Nombre del Instructor",
        cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
        accessorKey: "email",
        header: "Email del Instructor",
        cell: ({ row }) => <div>{row.original.email}</div>,

    },

]; 