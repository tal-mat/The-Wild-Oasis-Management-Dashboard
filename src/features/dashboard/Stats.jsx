import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat.jsx";
import { formatCurrency } from "../../utils/helpers.js";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // Calculate the total number of bookings
  const numBookings = bookings.length;

  // Calculate the total sales from all bookings
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // Calculate the total number of check-ins
  const checkins = confirmedStays.length;

  // Calculate the occupancy rate based on confirmed stays
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      {/* Displays the number of bookings */}
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      {/* Displays the total sales in formatted currency */}
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      {/* Displays the number of check-ins */}
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      {/* Displays the occupancy rate as a percentage */}
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
