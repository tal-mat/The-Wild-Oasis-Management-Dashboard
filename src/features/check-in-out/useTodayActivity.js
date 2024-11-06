import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings.js";

// Custom hook to retrieve today's stay activity data with loading state
export function useTodayActivity() {
  const { isPending, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isPending };
}
