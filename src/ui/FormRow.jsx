import styled from "styled-components";

import Input from "./Input.jsx";

// Styled component for a form row that organizes its children in a grid layout.
const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

// Styled component for a label with specific font weight.
const Label = styled.label`
  font-weight: 500;
`;

// Styled component for displaying an error message with specific styles.
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

// Functional component representing a row in a form, displaying a label, error, and children.
function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
