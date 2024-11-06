import styled from "styled-components";
import Heading from "./Heading.jsx";
import GlobalStyles from "../styles/GlobalStyles.js";
import Button from "./Button.jsx";

// Styled container for the entire error fallback layout
const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

// Styled box for error message content
const Box = styled.div`
  /* Box */
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-gray-500);
  }
`;

// ErrorFallback component to display error message
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading as="h1">Something went wrong 😖</Heading>
          <p>{error.message}</p>
          <Button size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
