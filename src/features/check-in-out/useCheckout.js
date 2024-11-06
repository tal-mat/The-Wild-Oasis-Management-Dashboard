import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

// Custom hook for handling the check-out process
export function useCheckout() {
  const queryClient = useQueryClient();

  // Use mutation to handle the check-out process and its state
  const { mutate: checkout, isPending: isCheckOut } = useMutation({
    // Mutation function to update booking status to "checked-in" and mark as paid
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    // Callback for when the mutation is successful
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    // Callback for when there is an error during the mutation
    onError: () => toast.error("There was en error while checking out"),
  });

  return { checkout, isCheckOut };
}
