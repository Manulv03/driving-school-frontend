"use client";

import { DataTable } from "@/components/common/data-table";
import { INSTRUCTORS_COLUMNS } from "./instructors-columns";
import { useGetAllInstructors } from "@/hooks/instructors/use-getAllInstructors";



export function ManageInstructorsTable() {
   
    const { data: instructors, isLoading: loading } = useGetAllInstructors();

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto ">
            <DataTable
                columns={INSTRUCTORS_COLUMNS}
                data={instructors || []}
                filterValue="name"
                placeholder="Buscar por nombre del curso..."
                filterLabel="Buscar Curso"
            />
        </div>
    );
}