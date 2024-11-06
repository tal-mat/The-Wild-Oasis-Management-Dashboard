import styled from "styled-components";

// Container for form row with vertical layout and spacing between elements
const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

// Styled label for form fields, ensuring consistent font weight
const Label = styled.label`
  font-weight: 500;
`;

// Styled error message with red color and font size for better visibility
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

// Component rendering a vertically stacked form row with an optional label and error message
function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
