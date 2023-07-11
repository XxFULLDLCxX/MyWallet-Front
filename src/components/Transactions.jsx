import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Infos, axios_instance } from '../context/core';
import { Link } from 'react-router-dom';

export default function Transactions() {
  const { user } = useContext(Infos);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [updating, setUpdating] = useState(0);
  useEffect(() => {
    axios_instance.get('/transactions', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(({ data }) => {
        setTransactions(data.slice(1));
        setTotal(data[0])
        console.log(data);
      })
      .catch((err) => alert(err.message)); // prettier-ignore
  }, [updating]);

  const deleteItem = async (id, description, value) => {
    console.log(id);
    if (!confirm(`Quer Deletar a Transação: ${description}, no valor de ${value}?`)) return;
    axios_instance.delete(`/transactions/${id}`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(() => setUpdating(updating + 1))
      .catch((err) => alert(err.message)); // prettier-ignore
  };

  return (
    <TransactionsContainer>
      <ul>
        {transactions.map((i) => (
          <ListItem
            id={i._id}
            key={i._id}
            date={i.date}
            description={i.description}
            value={i.value}
            operation={i.operation}
            deleteItem={deleteItem}
          />
        ))}
      </ul>

      <article>
        <strong>Saldo</strong>
        <Value data-test="total-amount" color={total >= 0 ? 'input' : 'output'}>
          {total.toFixed(2).toString().replace('.', ',')}
        </Value>
      </article>
    </TransactionsContainer>
  );
}

function ListItem({ id, date, description, value, operation, deleteItem }) {
  return (
    <ListItemContainer>
      <div>
        <span>{date}</span>
        <Link
          data-test="registry-name"
          to={`/editar-registro/${operation === 'input' ? 'entrada' : 'saida'}/${id}`}
          state={{ id, description, value, operation }}
        >
          {description}
        </Link>
      </div>
      <Value data-test="registry-amount" color={operation}>
        {Number(value).toFixed(2).toString().replace('.', ',')}
      </Value>
      <div data-test="registry-delete" onClick={() => deleteItem(id, description, value)}>
        x
      </div>
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
  margin: 0 25px 0 auto;
`;
const ListItemContainer = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  a {
    color: #000000;
    font-family: Raleway;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
  }
  div {
    text-align: center;
    min-width: 15px;
    cursor: pointer;
    span {
      color: #c6c6c6;
      margin-right: 10px;
    }
  }
`;
