import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditBooking } from "../../services/apiBookings.js";

// Custom hook for creating and managing booking state
export function useCreateBooking() {
  const queryClient = useQueryClient();

  // Mutation to create a booking
  const { mutate: createBooking, isPending: isCreating } = useMutation({
    mutationFn: createEditBooking, // Function to create or edit a booking
    onSuccess: () => {
      toast.success("New booking successfully created");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBooking };
}
