import React from "react";
import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import { useCabins } from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import Empty from "../../ui/Empty.jsx";

// CabinTable component fetches and displays a table of cabins with loading state handling.
function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  // Render a spinner while the cabins' data is being loaded
  if (isPending) return <Spinner />;

  // Renders an Empty component if there are no cabins available.
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1. FILTER: Filter cabins based on the discount criteria from search parameters
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  switch (filterValue) {
    case "all":
      filteredCabins = cabins;
      break;

    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;

    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;

    default:
      filteredCabins = cabins;
  }

  // 2. SORT: Sort cabins based on the specified field and direction from search parameters
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* Table body renders each cabin using the CabinRow component */}
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
