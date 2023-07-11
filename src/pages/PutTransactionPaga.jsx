import axios from 'axios';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Infos } from '../context/core';

export default function PutTransactionsPage() {
  const navigate = useNavigate();
  const { user } = useContext(Infos);
  const [info, setInfo] = useState(useLocation().state);
  const { id, description, value, operation } = info;
  const br_operation = operation === 'input' ? 'entrada' : 'saida';
  const editTransaction = (e) => {
    e.preventDefault();
    axios.put(`/transactions/${id}`,
        { description, value, operation },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then(({ data }) => {
        console.log(data);
        navigate('/home');
      })
      .catch((err) => alert(err.response.data)); // prettier-ignore
  };
  return (
    <TransactionsContainer>
      <h1>Nova {br_operation}</h1>
      <form onSubmit={editTransaction}>
        <input
          data-test="registry-amount-input"
          placeholder="Valor"
          type="text"
          name="money"
          value={value}
          onChange={(e) => setInfo({ ...info, value: e.target.value.replace(',', '.') })}
        />
        <input
          data-test="registry-name-input"
          placeholder="Descrição"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setInfo({ ...info, description: e.target.value })}
        />
        <fieldset>
          <legend>Selecione a Operação: </legend>

          <div>
            <input
              type="radio"
              id="input"
              name="operation"
              checked={operation === 'input'}
              onChange={() => {
                navigate(`/editar-registro/${br_operation}/${id}`, { state: { info } });
                setInfo({ ...info, operation: 'input' });
              }}
            />
            <label htmlFor="input">Entrada</label>
          </div>

          <div>
            <input
              type="radio"
              id="output"
              name="operation"
              checked={operation === 'output'}
              onChange={() => {
                navigate(`/editar-registro/${br_operation}/${id}`, { state: { info } });
                setInfo({ ...info, operation: 'output' });
              }}
            />
            <label htmlFor="output">Saída</label>
          </div>
        </fieldset>
        ;
        <button data-test="registry-save" type="submit">
          Salvar {br_operation}
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
  fieldset {
    border: 1px solid #000;
    padding: 10px 20px;
    background-color: #fff;
    legend {
      background-color: #fff;
      border: 1px solid #000;
      padding: 10px;
    }
    div {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
    }
    p,
    label {
      font: 1rem 'Fira Sans', sans-serif;
    }

    input {
      margin: 0.4rem;
      width: auto;
    }
  }
`;
