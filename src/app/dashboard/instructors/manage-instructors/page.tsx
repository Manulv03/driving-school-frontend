import { ManageCoursesTable } from "@/components/courses/table/table";
import { ManageInstructorsTable } from "@/components/instructors/table/table";
import { Card } from "@/components/ui/card";


export default function InstructorsPage() {
    return (

        <div className="container mx-auto p-4">
            <Card className="mb-6 p-6">
                <h1 className="text-3xl font-bold">Gestionar Instructores</h1>
                <p className="text-gray-600">
                    Aquí puedes gestionar los instructores, asignarles clases y ver su progreso.
                </p>
                <ManageInstructorsTable />
            </Card>
        </div>


    );
}