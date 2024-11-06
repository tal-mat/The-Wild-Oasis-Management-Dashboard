import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty.jsx";

import { useBookings } from "./useBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";

// Displays a table of bookings with headers, rows, and pagination.
function BookingTable() {
  const { bookings, isPending, count } = useBookings();

  // Renders a Spinner component while booking's data is pending.
  if (isPending) return <Spinner />;

  // Renders an Empty component if there are no bookings available.
  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      {/* Table layout for displaying booking information */}
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        {/* Table body rendering each booking as a row */}
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        {/* Table footer with pagination */}
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
