import styled from "styled-components";
import { createContext, useContext } from "react";

// Styled container for the entire table with border, background, and font settings
const StyledTable = styled.div`
  border: 1px solid var(--color-gray-200);
  font-size: 1.4rem;
  background-color: var(--color-gray-0);
  border-radius: 7px;
`;

// Common row styled component that uses a grid layout for its children
const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

// Styled component for the table header with specific padding, background, and text styles
const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-gray-50);
  border-bottom: 1px solid var(--color-gray-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-gray-600);
`;

// Styled component for individual table rows with padding and border settings
const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-100);
  }
`;

// Styled section for the body of the table, providing margin
const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

// Styled component for the table footer with background and layout settings
const Footer = styled.footer`
  background-color: var(--color-gray-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  // This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has
  &:not(:has(*)) {
    display: none;
  }
`;

// Styled component for displaying an empty message in the table
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// Create a context for managing table column configuration
const TableContext = createContext();

// Table component serves as a wrapper for table elements, providing context for the number of columns used in the table.
function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

// Header component represents the header section of the table, using the provided columns from context to define its layout.
function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

// Row component represents an individual row in the table, using the column configuration from context for layout.
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

// Body component serves as a container for the table's body content, allowing organized structuring of rows within the table.
function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

// Exposing the Table components for usage
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
