import styled from 'styled-components';
import { BiExit } from 'react-icons/bi';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import Transactions from '../components/Transactions';
import VerifyAuth from '../components/auth/Verify';
import { useContext } from 'react';
import { Infos } from '../context/core';

export default function HomePage() {
  const { user } = useContext(Infos);

  return (
    <VerifyAuth user={user}>
      <HomeContainer>
        <Header>
          <h1>Olá, {user?.name}</h1>
          <BiExit />
        </Header>
        <Transactions />
        <ButtonsContainer>
          <button>
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </button>
          <button>
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
