import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import styled from "styled-components";

// Styled component for the main app layout using CSS Grid
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

// Styled component for the main content area
const Main = styled.main`
  background-color: var(--color-gray-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
`;

// Styled component for a container to hold the content
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
