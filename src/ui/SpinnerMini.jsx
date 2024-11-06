import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

// Keyframe animation for rotating effect
const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

// Styled component for a mini spinner icon
const SpinnerMini = styled(BiLoaderAlt)`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
