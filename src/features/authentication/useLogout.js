import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth.js";

// Handles user logout and navigation
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); // Clears all cached user data after logout
      navigate("/login", { replace: true }); // Redirects to log in and replaces history to allow back btn to work
    },
  });

  return { logout, isPending };
}
