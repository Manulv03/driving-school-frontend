import { axiosClient } from "../axios-client";

interface CourseData {
  email: string;
  courseId: string;
}

export async function registerCourse(courseData: CourseData) {
  try {
    const response = await axiosClient.post(
      "/student/enroll",
      courseData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering course:", error);
    throw error;
  }
}
