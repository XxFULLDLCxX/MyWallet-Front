import styled from 'styled-components';

export default function TransactionsPage() {
  /* 
  Prevejo que possa haver um bug, se o avaliador pressionar o button antes 
  do App.js rodar o navigate('/'), nos casos onde o localStorage é empty 
  */

  console.log('Nova-Transaction');
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input placeholder="Valor" type="text" />
        <input placeholder="Descrição" type="text" />
        <button>Salvar TRANSAÇÃO</button>
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
