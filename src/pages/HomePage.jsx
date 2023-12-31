import styled from 'styled-components';
import { BiExit } from 'react-icons/bi';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import Transactions from '../components/Transactions';
import VerifyAuth from '../components/auth/Verify';
import { useContext } from 'react';
import { Infos } from '../context/core';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { user } = useContext(Infos);
  const navigate = useNavigate();

  return (
    <VerifyAuth user={user}>
      <HomeContainer>
        <Header>
          <h1 data-test="user-name">Olá, {user?.name}</h1>
          <div
            data-test="logout"
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
          >
            <BiExit />
          </div>
        </Header>
        <Transactions />
        <ButtonsContainer>
          <button data-test="new-income" onClick={() => navigate('/nova-transacao/entrada')}>
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </button>
          <button data-test="new-expense" onClick={() => navigate('/nova-transacao/saida')}>
            <AiOutlineMinusCircle />
            <p>
              Nova <br /> saída
            </p>
          </button>
        </ButtonsContainer>
      </HomeContainer>
    </VerifyAuth>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
