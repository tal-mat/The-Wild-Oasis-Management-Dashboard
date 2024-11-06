import { useEffect, useRef } from "react";

// Hook to detect and handle clicks outside a referenced element
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      // If the ref is defined and the click target is outside the element, call the handler
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    // Adding the event listener for click events, with capturing phase if specified
    document.addEventListener("click", handleClick, listenCapturing);

    // Cleanup function to remove the event listener when the component unmounts or the handler changes
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);
  return ref;
}
