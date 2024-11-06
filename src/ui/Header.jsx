import styled from "styled-components";
import HeaderMenu from "./HeaderMenu.jsx";
import UserAvatar from "../features/authentication/UserAvatar.jsx";

// Styled container for the header with background color, padding, and flex layout for alignment.
const StyledHeader = styled.header`
  background-color: var(--color-gray-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-gray-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

// Main header component containing user avatar and menu options.
function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
