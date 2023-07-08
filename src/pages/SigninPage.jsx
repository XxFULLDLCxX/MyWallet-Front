import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthSignin from '../components/auth/Signin';

export default function SignInPage() {
  return (
    <SinginContainer>
      <AuthSignin />
      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SinginContainer>
  );
}

const SinginContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
