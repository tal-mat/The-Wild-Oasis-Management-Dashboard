import { useNavigate } from "react-router-dom";

// Custom hook for navigating back one step in the browser's history.
export function useMoveBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}
