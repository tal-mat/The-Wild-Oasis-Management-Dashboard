import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings.js";

// Custom hook to fetch recent bookings based on the "last" query parameter in the URL
export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // Determines the number of days for recent bookings; defaults to 7 if no query parameter is provided
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // Calculates the starting date to filter bookings, converted to an ISO string for compatibility with Supabase
  const queryDate = subDays(new Date(), numDays).toISOString();

  // Fetches recent bookings using React Query, caching results based on `last-numDays` to avoid refetching all bookings
  const { isPending, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isPending, bookings };
}
