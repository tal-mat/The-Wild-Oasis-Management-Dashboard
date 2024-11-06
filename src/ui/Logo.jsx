import styled from "styled-components";
import { useDarkMode } from "../contexts/DarkModeContext.jsx";

// Styled component for the logo container
const StyledLogo = styled.div`
  text-align: center;
`;

// Styled component for the image
const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

// Component that displays the logo, switching between light and dark mode based on the current theme
function Logo() {
  const { isDarkMode } = useDarkMode();

  // Determine the source of the logo based on the current mode
  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
