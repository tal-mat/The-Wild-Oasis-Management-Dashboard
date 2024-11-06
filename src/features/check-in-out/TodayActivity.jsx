import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity.js";
import Spinner from "../../ui/Spinner.jsx";
import TodayItem from "./TodayItem.jsx";

// Styled component for the main container of today's activities
const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

// Styled component for the list of today's activities
const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

// Styled component for displaying a message when there are no activities
const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

// Today component to display the activities for the current day
function TodayActivity() {
  const { activities, isPending } = useTodayActivity();

  return (
    <StyledToday>
      {/* Row containing the heading for today's activities */}
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isPending ? (
        activities?.length > 0 ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
