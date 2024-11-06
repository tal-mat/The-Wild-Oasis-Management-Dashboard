import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm.jsx";
import Heading from "../ui/Heading.jsx";
import Logo from "../ui/Logo.jsx";

//  Styled component for login page layout, defining grid structure and styles.
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-gray-50);
`;

// Login component renders the login page layout, including a logo, heading, and login form.
function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h3">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
