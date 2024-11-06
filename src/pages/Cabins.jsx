import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.jsx";
import AddCabin from "../features/cabins/AddCabin.jsx";
import CabinTableOperations from "../features/cabins/CabinTableOperations.jsx";

// Main component for managing cabins
function Cabins() {
  return (
    <>
      {/* Header and operations for cabin management */}
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>
        <CabinTableOperations />
      </Row>

      {/* Displaying the table of cabins and the option to add a new cabin */}
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
