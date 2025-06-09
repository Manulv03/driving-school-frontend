type CoursesTypes = "TEORICO" | "PRACTICO";

export interface Course {
  id?: number;
  name: string;
  description: string;
  durationHours: number;
  type: CoursesTypes;
  instructorId: number; // Optional, if the course is assigned to an instructor
  instructorName?: string; // Optional, if the course is assigned to an instructor
}
