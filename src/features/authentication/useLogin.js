import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

// Custom hook for user login functionality (e.g., credentials are {email, password})
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutation for handling the login process
  const { mutate: login, isPending } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true }); // replacing current history entry to allow back button functionality
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isPending };
}
