import styled, { css } from "styled-components";

// Styled component for a form that adjusts its styles based on the provided type prop.
const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-gray-0);
      border: 1px solid var(--color-gray-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}

  ${(props) =>
    props.type === "login" &&
    css`
      width: 100%;
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
