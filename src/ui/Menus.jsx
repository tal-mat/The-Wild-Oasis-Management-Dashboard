import { createContext, useContext, useState } from "react";

import styled from "styled-components";

import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

// Styled component for the menu container
const Menu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// Styled component for the toggle button
const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-gray-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-gray-700);
  }
`;

// Styled component for the dropdown list
const StyledList = styled.ul`
  position: absolute;
  z-index: 1;

  background-color: var(--color-gray-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

// Styled component for individual buttons in the dropdown
const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-gray-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-gray-400);
    transition: all 0.3s;
  }
`;

// Create context for managing menu state
const MenusContext = createContext();

// Menus component serves as a provider for menu state
function Menus({ children }) {
  const [openId, setOpenId] = useState(""); // State to track the currently open menu ID
  const [position, setPosition] = useState(null); // State to track the position of the open menu

  const close = () => setOpenId(""); // Function to close the open menu
  const open = setOpenId; // Function to set the open menu ID

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

// Toggle component for opening and closing the menu
function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  // Function to handle toggle button click
  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect(); // Get the bounding rect of the button
    setPosition({
      x: -8,
      y: rect.height,
    });

    // Open or close the menu based on current state
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical /> {/* Icon for the toggle button */}
    </StyledToggle>
  );
}

// List component for rendering the dropdown menu items
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false); // Hook to close the menu when clicking outside it

  if (openId !== id) return null;

  return (
    <StyledList position={position} ref={ref}>
      {/*<StyledList position={position}>*/}
      {/* Render the dropdown list */}
      {children}
    </StyledList>
  );
}

// Button component for individual menu actions
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  // Function to handle button click
  function handleClick() {
    onClick?.(); // Execute provided onClick function if it exists
    close(); // Close the menu
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} {/* Render the button icon */}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// Attach components to the Menus object for external use
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
