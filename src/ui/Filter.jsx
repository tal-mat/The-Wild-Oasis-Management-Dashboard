import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

// Styled div for filter container with border, shadow, and flex layout
const StyledFilter = styled.div`
  border: 1px solid var(--color-gray-100);
  background-color: var(--color-gray-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

// Styled button for filter options with conditional active styling and hover effects
const FilterButton = styled.button`
  background-color: var(--color-gray-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// Filter component that renders buttons for selecting options and managing search parameters
function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField || options.at(0)?.value);

  // Updates search parameters on button click and resets page number if new filter exists
  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {/* Renders buttons for each option, updating the filter state and disabling the active option */}
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          // active={option.value === currentFilter}
          active={option.value === currentFilter ? "true" : undefined}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
