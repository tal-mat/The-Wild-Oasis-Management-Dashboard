import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useCheckin } from "./useCheckin.js";
import { useSettings } from "../settings/useSettings.js";

// Styled component for the booking check-in box
const Box = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

// CheckinBooking component for managing the check-in process
function CheckinBooking() {
  // State variables for confirmation of payment and breakfast addition
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  // Hooks for managing booking data, settings, navigation, and check-in process
  const { booking, isPending } = useBooking();
  const { settings, isPending: isPendingSettings } = useSettings();
  const moveBack = useMoveBack();
  const { checkin, isCheckIn } = useCheckin();

  // Update the confirmation state based on the booking's payment status
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  // Show a spinner while data is being fetched
  if (isPending || isPendingSettings) return <Spinner />;

  // Destructure booking properties for use in the component
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  // Calculate the optional breakfast price based on settings
  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  // Function to handle check-in action
  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      {/* Row containing the heading and back button */}
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      {/* Component displaying booking details */}
      <BookingDataBox booking={booking} />

      {/* Checkbox for adding Breakfast', toggles its state and resets 'confirmPaid' */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      {/* Checkbox for confirming that the guest has paid the total amount */}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice,
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
        </Checkbox>
      </Box>

      {/* Grouping check-in and back buttons */}
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
