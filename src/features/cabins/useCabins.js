import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins.js";

// Custom hook to fetch cabin data using React Query
export function useCabins() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isPending, error, cabins };
}
