import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Infos } from '../context/core';

export default function Transactions() {
  const { user } = useContext(Infos);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    axios.get('/transactions', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({ data }) => {
        setTransactions(data.slice(1));
        setTotal(data[0])
      })
      .catch((err) => alert(err.message)); // prettier-ignore
  }, []);

  return (
    <TransactionsContainer>
      <ul>
        {transactions.map((i, index) => (
          <ListItem key={index} date={i.date} description={i.description} value={i.value} operation={i.operation} />
        ))}
      </ul>

      <article>
        <strong>Saldo</strong>
        <Value color={total >= 0 ? 'input' : 'output'}>{total.toFixed(2).toString().replace('.', ',')}</Value>
      </article>
    </TransactionsContainer>
  );
}

function ListItem({ date, description, value, operation }) {
  /* Verificar depois, talvez o value não possa ter sinal negativo, sendo só a cor que reflete o valor */
  return (
    <ListItemContainer>
      <div>
        <span>{date}</span>
        <strong>{description}</strong>
      </div>
      <Value color={operation}>{Number(value).toFixed(2).toString().replace('.', ',')}</Value>
    </ListItemContainer>
  );
}

const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === 'input' ? 'green' : 'red')};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
