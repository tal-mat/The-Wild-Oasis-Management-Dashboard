import styled from "styled-components";

// Styled component for a textarea with padding, border, and shadow for better UX.
const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-gray-300);
  border-radius: 5px;
  background-color: var(--color-gray-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 8rem;
`;

export default Textarea;
