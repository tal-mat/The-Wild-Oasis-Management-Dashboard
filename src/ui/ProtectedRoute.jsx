import React, { useEffect } from "react";

import { useUser } from "../features/authentication/useUser.js";
import styled from "styled-components";
import Spinner from "./Spinner.jsx";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Component that protects routes, ensuring the user is authenticated before access.
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { user, isPending, isAuthenticated, fetchStatus } = useUser();

  // 2. if there is NO authenticated user, redirects to the /login
  useEffect(() => {
    if (!isPending && !isAuthenticated && fetchStatus !== "fetching") {
      navigate("/login");
    }
  }, [isPending, isAuthenticated, fetchStatus, navigate]);

  // 3. While loading, show a spinner
  if (isPending || fetchStatus === "fetching")
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
