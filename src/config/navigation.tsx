import {
  BookMarkedIcon,
  Calendar,
  GraduationCap,
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
          url: "/dashboard/clases/gestionar",
        },
        {
          title: "Calendario",
          url: "/dashboard/clases/calendario",
        },
      ],
    },
    {
      title: "Instructores",
      url: "/dashboard/instructores",
      icon: GraduationCap,
      items: [
        {
          title: "Lista de Instructores",
          url: "/dashboard/instructores/lista",
        },
        {
          title: "Asignar Clases",
          url: "/dashboard/instructores/asignar",
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
