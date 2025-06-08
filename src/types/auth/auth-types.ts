// Roles que vienen del backend
export type BackendRole = "ADMIN" | "INSTRUCTOR" | "STUDENT"

// Roles mapeados para el frontend
export type Role = "admin" | "instructor" | "alumno"

export interface User {
  id: string
  name: string
  userName: string
  email: string
  role: Role
  avatar?: string
}

// Respuesta del backend para autenticación
export interface AuthResponse {
  token: string
  username: string
  email: string
  roles: BackendRole[]
}

// Función auxiliar para mapear roles del backend al frontend
export function mapBackendRole(role: BackendRole): Role {
  const roleMap: Record<BackendRole, Role> = {
    ADMIN: "admin",
    INSTRUCTOR: "instructor",
    STUDENT: "alumno",
  }
  return roleMap[role]
}
