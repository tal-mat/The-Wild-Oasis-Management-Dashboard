import styled from "styled-components";
import Tag from "../../ui/Tag.jsx";
import { Flag } from "../../ui/Flag.jsx";
import Button from "../../ui/Button.jsx";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton.jsx";

// Styled component for individual items in today's list
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-gray-100);

  /* Add a top border for the first item in the list */
  &:first-child {
    border-top: 1px solid var(--color-gray-100);
  }
`;

// Styled component for displaying guest information
const Guest = styled.div`
  font-weight: 500;
`;

// Displays today's activity item with guest details and actions based on the status.
function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {/* Displays a tag indicating the arrival or departure status */}
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      {/* Displays guest details including country flag, name, and number of nights */}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {/* Renders a check-in button for unconfirmed guests */}
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}

      {/* Renders a checkout button for checked-in guests */}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
