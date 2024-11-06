import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

// Custom hook for handling the check-in process
export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Use mutation to handle the check-in process and its state
  const { mutate: checkin, isPending: isCheckIn } = useMutation({
    // Mutation function to update booking status to "checked-in" and mark as paid
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    // Callback for when the mutation is successful
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    // Callback for when there is an error during the mutation
    onError: () => toast.error("There was en error while checking in"),
  });

  return { checkin, isCheckIn };
}
