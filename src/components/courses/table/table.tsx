"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/common/data-table";
import { COURSES_COLUMNS } from "./columns";
import { Course } from "@/types/courses/courses-types";
import { useGetAllCourses } from "@/hooks/courses/use-getAllCourses";

export function ManageCoursesTable() {
    const { data: coursesData, isLoading: loading } = useGetAllCourses();

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto ">
            <DataTable
                columns={COURSES_COLUMNS}
                data={coursesData as Course[]}
                filterValue="name"
                placeholder="Buscar por nombre del curso..."
                filterLabel="Buscar Curso"
            />
        </div>
    );
}