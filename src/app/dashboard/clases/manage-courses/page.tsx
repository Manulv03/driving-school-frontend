import { ManageCoursesTable } from "@/components/courses/table/table"
import { Card } from "@/components/ui/card"

export default function ManageCoursesPage() {
  return (
    <div className="container mx-auto p-4">

      <Card className="mb-6 p-6">

        <h1 className="text-3xl font-bold ">Gestionar Clases</h1>
        <p className="text-gray-600 ">
          Aquí puedes gestionar las clases disponibles, asignar instructores y
          ver el progreso de los alumnos.
        </p>
        <ManageCoursesTable />
      </Card>
    </div>
  )
}