import { useSearchParams } from "react-router-dom";

import Select from "./Select.jsx";

// Component for selecting sorting options from provided options
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || ""; // Retrieve the current sortBy value from search parameters

  // Update the sortBy parameter in the URL when selection changes
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  // return sorting options type, value and handler for the select component
  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
