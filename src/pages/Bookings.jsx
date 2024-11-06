import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable.jsx";
import BookingTableOperations from "../features/bookings/BookingTableOperations.jsx";

// Component that renders the booking's page, including a heading and a table of bookings.
function Bookings() {
  return (
    <>
      {/* Container for horizontal layout of heading and additional content */}
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      {/* Table displaying all bookings */}
      <Row>
        <BookingTable />
        {/*<AddBooking />*/}
      </Row>
    </>
  );
}

export default Bookings;
