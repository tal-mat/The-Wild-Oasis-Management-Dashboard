import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

// Custom hook for editing booking state
export function useEditBooking() {
  const queryClient = useQueryClient();

  // Mutation to edit a booking
  const { mutate: editBooking, isPending: isEditing } = useMutation({
    mutationFn: ({ newBookingData, id }) =>
      createEditBooking(newBookingData, id),
    onSuccess: () => {
      toast.success("Booking successfully edited");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editBooking };
}
