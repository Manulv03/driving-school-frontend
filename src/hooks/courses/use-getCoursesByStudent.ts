
import { getCoursesByStudent } from "@/lib/courses-service/courses-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCoursesByStudent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["list-all-courses-by-student"],
    queryFn: () => getCoursesByStudent(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { data, isLoading, error };
};
