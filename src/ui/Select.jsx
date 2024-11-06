import styled from "styled-components";

// Styled component for a custom select element
const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-gray-100)"
        : "var(--color-gray-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-gray-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

// Functional component to render a styled select dropdown
function Select({ options, value, type, onChange }) {
  return (
    <StyledSelect value={value} type={type} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
