import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

// Custom hook to fetch and manage settings data using react-query
export function useSettings() {
  const {
    isPending,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isPending, error, settings };
}
