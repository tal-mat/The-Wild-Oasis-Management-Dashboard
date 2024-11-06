import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

// Styled component for the main container of booking data
const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

// Styled component for the header section, displaying booking details
const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

// Styled component for content sections within the booking data
const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

// Styled component for displaying guest information
const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-gray-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-gray-700);
  }
`;

// Styled component for price details, changes color based on payment status
const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

// Styled component for the footer, displaying booking timestamp
const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-gray-500);
  text-align: right;
`;

// Component rendering booking data details, including guest and payment information
function BookingDataBox({ booking }) {
  const {
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      {/* Header displaying the stay duration and cabin name */}
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        {/* Displays start and end dates, with "Today" if the start date is current */}
        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        {/* Guest information section with flag, name, email, and ID */}
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {/* Conditionally render observations if available */}
        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        {/* Breakfast inclusion status */}
        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        {/* Total price section, styling varies based on payment status */}
        <Price $isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {/* Detailed price breakdown if breakfast is included */}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice,
              )} breakfast)`}
          </DataItem>

          {/* Payment status display */}
          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      {/* Footer showing the booking timestamp */}
      <Footer>
        <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
