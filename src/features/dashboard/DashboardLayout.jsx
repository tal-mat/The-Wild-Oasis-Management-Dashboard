import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings.js";
import { useRecentStays } from "./useRecentStays.js";
import Spinner from "../../ui/Spinner.jsx";
import Stats from "./Stats.jsx";
import { useCabins } from "../cabins/useCabins.js";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import TodayActivity from "../check-in-out/TodayActivity.jsx";

// Styled component for Dashboard layout grid structure
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

// Main Dashboard layout component
function DashboardLayout() {
  // Retrieve recent data for bookings, stays, and cabins with respective loading states
  const { bookings, isPending: isPendingBookings } = useRecentBookings();
  const {
    confirmedStays,
    isPending: isPendingStays,
    numDays,
  } = useRecentStays();
  const { cabins, isPending: isPendingCabins } = useCabins();

  // Show spinner if any data is still loading
  if (isPendingBookings || isPendingStays || isPendingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      {/* Stats component displays summary statistics for bookings, stays, and cabins */}
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      {/* Chart for stay durations */}
      <DurationChart confirmedStays={confirmedStays} />
      {/* Chart for sales over time */}
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
