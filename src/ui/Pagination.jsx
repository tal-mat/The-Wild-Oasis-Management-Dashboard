import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants.js";

// Container for pagination, centers content and takes full width.
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Paragraph for pagination info with a bold span element.
const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

// Container for pagination buttons with a gap between them.
const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

// Button for pagination with active/inactive styles and hover effects.
const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-gray-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  // Adjusts padding if the button contains only an icon or text.
  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  // Styles SVG icons inside the button.
  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  // Changes background and text color on hover, unless disabled.
  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Gets the current page from the URL, defaults to 1 if no page is specified.
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // Calculates the total number of pages based on the count and page size.
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // Navigate to the next page, but prevent exceeding total page count.
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  // Navigate to the previous page, but prevent going below page 1.
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  // If there's only one page or no results, hide pagination controls.
  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        {/* Display the current range of results based on the current page */}
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </P>

      <Buttons>
        {/* Disable "Previous" if on the first page */}
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>

        {/* Disable "Next" if on the last page */}
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
