import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth.js";

// Custom hook to handle user signup with success notification.
export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address.",
      );
    },
    onError: (error) =>
      toast.error(error.message || "An error occurred during registration"),
  });

  return { signup, isPending };
}
