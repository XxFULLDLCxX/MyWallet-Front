import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Infos } from '../context/core';

export default function TransactionsPage() {
  // { description, value, operation };
  const navigate = useNavigate();
  const { user } = useContext(Infos);
  const { tipo } = useParams();
  const saveTransaction = (e) => {
    e.preventDefault();
    const body = {
      description: e.target.description.value,
      value: Number(e.target.money.value).toFixed(1),
      operation: tipo === 'entrada' ? 'input' : 'output',
    };
    axios.post('/transactions', body, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({ data }) => {
        console.log(data);
        navigate('/home');
      })
      .catch((err) => alert(err.response.data)); // prettier-ignore
  };
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={saveTransaction}>
        <input data-test="registry-amount-input" placeholder="Valor" type="text" name="money" />
        <input data-test="registry-name-input" placeholder="Descrição" type="text" name="description" />
        <button data-test="registry-save" type="submit">
          Salvar {tipo}
        </button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
