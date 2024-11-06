import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

// Custom hook for editing cabin data
export function useEditCabin() {
  const queryClient = useQueryClient();

  // Setting up mutation for editing cabin data
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
