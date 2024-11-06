import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";
import { PAGE_SIZE } from "../../utils/constants.js";

// Custom hook to fetch bookings' data using React Query
export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER: Determine the filter value for booking status from search parameters.
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT: Extract sorting field and direction from URL parameters (defaults to sorting by startDate in descending order).
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  // PAGINATION: Gets the current page from the URL, defaults to 1 if no page is specified.
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isPending,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING: Pre-fetch bookings for next/previous pages to enable faster navigation and smoother transitions.
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isPending, error, bookings, count };
}
