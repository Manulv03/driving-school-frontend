import { Course } from "@/types/courses/courses-types";
import { axiosClient } from "../axios-client";

export async function getCourses() {
  try {
    const response = await axiosClient.get("/admin/courses/list-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}
export async function getCoursesByStudent() {
  try {
    const response = await axiosClient.get("/student/list-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}
export async function getCourseById(courseId: string) {
  try {
    const response = await axiosClient.get(`/admin/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
}

export const coursesService = {
  getCourses,
  async createCourse(courseData: Course) {
    try {
      const response = await axiosClient.post(
        "/admin/courses/create",
        courseData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },
};


