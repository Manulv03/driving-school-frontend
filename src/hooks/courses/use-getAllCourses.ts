import { getCourses } from "@/lib/courses-service/courses-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCourses = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["lirt-all-courses"],
    queryFn: () => getCourses(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { data, isLoading, error };
};
