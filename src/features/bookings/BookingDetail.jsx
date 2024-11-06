import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner.jsx";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking.js";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout.js";
import { useDeleteBooking } from "./useDeleteBooking.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Empty from "../../ui/Empty.jsx";

// Styled component for grouping heading elements with spacing and alignment.
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

// Main component for rendering the booking details such as id, status, etc.
function BookingDetail() {
  // Custom hooks for fetching booking details, checkout, and booking deletion logic with loading states.
  const { booking, isPending } = useBooking();
  const { checkout, isCheckOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  // Navigation hooks for routing and moving back in history.
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isPending) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  const { status, id: bookingId } = booking;

  // Mapping of booking statuses to corresponding tag colors.
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      {/* Row for displaying the booking heading and status tag */}
      <Row type="horizontal">
        <HeadingGroup>
          {/* Display booking ID with dynamic status tag */}
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>

        {/* Back navigation button */}
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {/* Component for displaying detailed booking data */}
      <BookingDataBox booking={booking} />

      {/* Button group for navigation actions */}
      <ButtonGroup>
        {/* Button to confirm the booking if it is unconfirmed */}
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {/* Button to check out the booking if it is checked in */}
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          {/* Button to delete the booking  */}
          <Modal.Open opens="delete">
            <Button
              $variation="danger"
              icon={<HiTrash />}
              onClick={() => deleteBooking(bookingId)}
              disabled={isDeleting}
            >
              Delete booking
            </Button>
          </Modal.Open>

          {/* Modal to confirm booking deletion */}
          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeleting}
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(bookingId, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
