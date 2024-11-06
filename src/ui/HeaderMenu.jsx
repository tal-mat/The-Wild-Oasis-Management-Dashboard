import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { HiOutlineUser } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon.jsx";
import Logout from "../features/authentication/Logout.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";

// Styled container for the header menu items with flex layout.
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

// Header menu component displaying user icon, dark mode and logout button.
function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
