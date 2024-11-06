import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick.js";

// Styled component for the modal dialog
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

// Styled component for the modal overlay
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

// Styled component for the close button
const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-gray-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-gray-500);
  }
`;

// Creating a context for the modal
const ModalContext = createContext();

function Modal({ children }) {
  // State to track the currently open modal
  const [openName, setOpenName] = useState("");

  // Function to close the modal
  const close = () => setOpenName("");

  // Pass the open modal function for later use, it will only be invoked when called
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // Cloning child (the Button) to add onClick functionality from the Modal context
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  // Creating a portal to render the modal outside the main DOM hierarchy on the body
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {/* Cloning the child component and passing the onCloseModal function to it for modal closing functionality */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

// Attaching subcomponents to the Modal component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;

// import { cloneElement, createContext, useContext, useState } from "react";
// import { createPortal } from "react-dom";
// import { HiXMark } from "react-icons/hi2";
// import styled from "styled-components";
// import { useOutsideClick } from "../hooks/useOutsideClick";
//
// const StyledModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-lg);
//   box-shadow: var(--shadow-lg);
//   padding: 3.2rem 4rem;
//   transition: all 0.5s;
// `;
//
// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background-color: var(--backdrop-color);
//   backdrop-filter: blur(4px);
//   z-index: 1000;
//   transition: all 0.5s;
// `;
//
// const Button = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;
//
//   &:hover {
//     background-color: var(--color-grey-100);
//   }
//
//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     /* Sometimes we need both */
//     /* fill: var(--color-grey-500);
//     stroke: var(--color-grey-500); */
//     color: var(--color-grey-500);
//   }
// `;
//
// const ModalContext = createContext();
//
// function Modal({ children }) {
//   const [openName, setOpenName] = useState("");
//
//   const close = () => setOpenName("");
//   const open = setOpenName;
//
//   return (
//     <ModalContext.Provider value={{ openName, close, open }}>
//       {children}
//     </ModalContext.Provider>
//   );
// }
//
// function Open({ children, opens: opensWindowName }) {
//   const { open } = useContext(ModalContext);
//
//   return cloneElement(children, { onClick: () => open(opensWindowName) });
// }
//
// function Window({ children, name }) {
//   const { openName, close } = useContext(ModalContext);
//   const ref = useOutsideClick(close);
//
//   if (name !== openName) return null;
//
//   return createPortal(
//     <Overlay>
//       <StyledModal ref={ref}>
//         <Button onClick={close}>
//           <HiXMark />
//         </Button>
//
//         <div>{cloneElement(children, { onCloseModal: close })}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body,
//   );
// }
//
// Modal.Open = Open;
// Modal.Window = Window;
//
// export default Modal;
