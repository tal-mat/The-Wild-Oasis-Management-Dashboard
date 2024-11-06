import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings.js";

// Custom hook to fetch recent stays based on the "last" query parameter in the URL
export function useRecentStays() {
  const [searchParams] = useSearchParams();

  // Determines the number of days for recent stays; defaults to 7 if no query parameter is provided
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // Calculates the starting date to filter stays, converted to an ISO string for compatibility with Supabase
  const queryDate = subDays(new Date(), numDays).toISOString();

  // Fetches recent stays using React Query, caching results based on `last-numDays` to avoid refetching all
  const { isPending, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  // Filters stays to include only confirmed stays with statuses "checked-in" or "checked-out"
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return { isPending, stays, confirmedStays, numDays };
}
