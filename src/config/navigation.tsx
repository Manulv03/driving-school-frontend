import {
  BookCheck,
  BookMarkedIcon,
  Calendar,
  GraduationCap,
  Plus,
  Settings2,
  Users,
} from "lucide-react"
import { type LucideIcon } from "lucide-react"

export type Role = "admin" | "instructor" | "alumno"

interface NavigationItem {
  title: string
  url: string
  icon: LucideIcon
  items?: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}

type NavigationConfig = Record<Role, NavigationItem[]>

export const navigation: NavigationConfig = {
  admin: [
    {
      title: "Clases",
      url: "/dashboard/clases",
      icon: BookMarkedIcon,
      items: [
        {
          title: "Gestionar Clases",
          url: "/dashboard/clases/manage-courses",
          icon: BookCheck,
        },
        {
          title: "Crear Clase",
          url: "/dashboard/clases/create-course",
          icon: Plus,
        },
      ],
    },
    {
      title: "Instructores",
      url: "/dashboard/instructors",
      icon: GraduationCap,
      items: [
        {
          title: "Lista de Instructores",
          url: "/dashboard/instructors/manage-instructors",
          icon: Users,
        },

      ],
    },
    {
      title: "Alumnos",
      url: "/dashboard/alumnos",
      icon: Users,
      items: [
        {
          title: "Lista de Alumnos",
          url: "/dashboard/alumnos/lista",
        },
        {
          title: "Progreso",
          url: "/dashboard/alumnos/progreso",
        },
      ],
    },
    {
      title: "Configuración",
      url: "/dashboard/configuracion",
      icon: Settings2,
    },
    {
      title: "Usuarios",
      url: "/dashboard/users",
      icon: Users,
      items: [
        {
          title: "Crear Usuario",
          url: "/dashboard/users/create-user",
        },

      ],
    }
  ],
  instructor: [
    {
      title: "Mis Clases",
      url: "/dashboard/clases",
      icon: BookMarkedIcon,
      items: [
        {
          title: "Calendario",
          url: "/dashboard/clases/calendario",
        },
        {
          title: "Historial",
          url: "/dashboard/clases/historial",
        },
      ],
    },
    {
      title: "Alumnos",
      url: "/dashboard/alumnos",
      icon: Users,
      items: [
        {
          title: "Mis Alumnos",
          url: "/dashboard/alumnos/lista",
        },
        {
          title: "Registrar Progreso",
          url: "/dashboard/alumnos/progreso",
        },
      ],
    },
  ],
  alumno: [
    {
      title: "Mis Clases",
      url: "/dashboard/clases",
      icon: BookMarkedIcon,
      items: [
        {
          title: "Agregar Clase",
          url: "/dashboard/clases/add-class",
          icon: Calendar,
        },
        {
          title: "Historial",
          url: "/dashboard/clases/historial",
        },
      ],
    },
    {
      title: "Progreso",
      url: "/dashboard/progreso",
      icon: GraduationCap,
    },
    {
      title: "Agendar Clase",
      url: "/dashboard/agendar",
      icon: Calendar,
    },
  ],
}
