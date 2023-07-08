import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthSignup from '../components/auth/Signup';

export default function SignupPage() {
  return (
    <SingupContainer>
      <AuthSignup />
      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingupContainer>
  );
}

const SingupContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
