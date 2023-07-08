import { useState } from 'react';
import styled from 'styled-components';

export default function Transactions() {
  const [value, setValue] = useState(0);
  const list = [
    {
      date: '30/11',
      title: 'Almoço mãe',
      value: -120,
    },
    {
      date: '15/11',
      title: 'Salário',
      value: 3000,
    },
  ];
  return (
    <TransactionsContainer>
      <ul>
        {list.map((i) => (
          <ListItem date={i.date} title={i.title} money={i.value} value={value} setters={setValue} />
        ))}
      </ul>

      <article>
        <strong>Saldo</strong>
        <Value color={'positivo'}>{value}</Value>
      </article>
    </TransactionsContainer>
  );
}

function ListItem({ date, title, value }) {
  /* Verificar depois, talvez o value não possa ter sinal negativo, sendo só a cor que reflete o valor */
  return (
    <ListItemContainer>
      <div>
        <span>{date}</span>
        <strong>{title}</strong>
      </div>
      <Value color={value < 0 ? 'negative' : 'positive'}>{value.toFixed(2).toString().replace('.', ',')}</Value>
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
  color: ${(props) => (props.color === 'positive' ? 'green' : 'red')};
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
