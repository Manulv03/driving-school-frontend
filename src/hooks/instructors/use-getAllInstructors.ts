import { instructorService } from "@/lib/instructor-service/instructor-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllInstructors = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["list-all-instructors"],
    queryFn: () => instructorService.getInstructors(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { data, isLoading, error };
};
