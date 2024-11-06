import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";

// Represents the table operations for filtering and sorting cabins.
function CabinTableOperations() {
  return (
    <TableOperations>
      {/* Renders a filter component for cabin discounts */}
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      {/* Renders a sort component for sorting cabins by various attributes */}
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
