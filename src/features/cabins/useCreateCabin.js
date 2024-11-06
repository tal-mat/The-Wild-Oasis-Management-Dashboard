import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins.js";

// Custom hook for creating a new cabin using React Query's mutation.
export function useCreateCabin() {
  const queryClient = useQueryClient();

  // Sets up a mutation to create a new cabin, with success and error handling.
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
