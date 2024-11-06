import styled from "styled-components";

// Styled container for the DataItem component
const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

// Styled label with an icon
const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

// DataItem component definition
function DataItem({ icon, label, children }) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

export default DataItem;
