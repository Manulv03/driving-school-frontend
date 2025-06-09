import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Course } from "@/types/courses/courses-types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";


export const COURSES_COLUMNS: ColumnDef<Course>[] = [
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
                navigator.clipboard.writeText((insuruance.id ?? '').toString())
              }
            >
              Copy client ID
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
        header: "ID del Curso",
        cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
    },
    {
        accessorKey: "name",
        header: "Nombre del Curso",
        cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
        accessorKey: "description",
        header: "Descripción",
        cell: ({ row }) => <div>{row.original.description}</div>,
    },
    {
        accessorKey: "durationHours",
        header: "Duración (Horas)",
        cell: ({ row }) => <div>{row.original.durationHours}</div>,
    },
    {
        accessorKey: "type",
        header: "Tipo de Curso",
        cell: ({ row }) => <div>{row.original.type}</div>,
    },
  
    {
        accessorKey: "instructorName",
        header: "Instructor Asignado",
        cell: ({ row }) => <div>{row.original.instructorName || "No asignado"}</div>,
    },

   
]; 