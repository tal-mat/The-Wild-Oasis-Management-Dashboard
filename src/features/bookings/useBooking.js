import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

// Custom hook to fetch a single booking's data using React Query based on the booking ID from the URL parameters.
export function useBooking() {
  const { bookingId } = useParams();

  const {
    isPending,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId), // No need to retry fetching if data is not found, as a missing booking indicates it doesn't exist.
    retry: false,
  });

  return { isPending, error, booking };
}
