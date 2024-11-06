import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal.jsx";
import Menus from "../../ui/Menus.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout.js";
import { useDeleteBooking } from "./useDeleteBooking.js";
import CreateBookingForm from "./CreateBookingForm.jsx";

// Booking name display component with custom styles.
const Booking = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-gray-600);
  font-family: "Sono";
`;

// Flex container to display guest details in stacked format.
const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-gray-500);
    font-size: 1.2rem;
  }
`;

// Styled component to display the booking amount.
const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

// Renders a row of booking details inside a table.
function BookingRow({ booking }) {
  const {
    id: bookingId,
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  } = booking;

  // Maps booking status to a tag color for consistent UI.
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();

  // Custom hooks for checkout and booking deletion logic with loading states.
  const { checkout, isCheckOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  return (
    <Table.Row>
      <Booking>{cabinName}</Booking>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        {/* Displays "Today" if the start date is today, otherwise shows the time from now and the number of nights for the stay */}
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>

        {/* Displays the formatted start and end dates of the booking */}
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      {/* Map status to tag color and format text by replacing hyphens with
      spaces. */}
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        {/* Menu for booking actions */}
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            {/* Button to navigate to booking details */}
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {/* Button to confirm the booking if it is unconfirmed */}
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {/* Button to check out the booking if it is checked in */}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckOut}
              >
                Check out
              </Menus.Button>
            )}

            {/* Button to edit the booking */}
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            {/* Button to delete the booking */}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                Delete booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>

          {/* Modal to edit booking */}
          <Modal.Window name="edit">
            <CreateBookingForm bookingToEdit={booking} />
          </Modal.Window>

          {/* Modal to confirm booking deletion */}
          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeleting}
              resourceName="booking"
              onConfirm={() => deleteBooking(bookingId)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
