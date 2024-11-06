import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

// Custom hook for updating user data
export function useUpdateUser() {
  const queryClient = useQueryClient();

  // Setting up mutation for updating user data
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
