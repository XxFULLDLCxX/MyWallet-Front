import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Infos } from '../../context/core';
import MyWalletLogo from '../MyWalletLogo';
import axios from 'axios';

export default function AuthSignin() {
  const { loading, setInfo, ...rest } = useContext(Infos);
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    setInfo({ ...rest, loading: true });

    const info = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios.post(`/auth/sign-in`, info)
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify({...data}));
        setInfo({ ...rest, loading: false, user: data});
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        navigate('/home');
        console.log(data);
      })
      .catch((error) => {
        setInfo({ ...rest, loading: false });
        alert(error.response.data.message);
      }); // prettier-ignore
  };
  return (
    <form onSubmit={login}>
      <MyWalletLogo />
      <input placeholder="E-mail" type="email" name="email" />
      <input placeholder="Senha" type="password" autoComplete="new-password" name="password" />
      <button>Entrar</button>
    </form>
  );
}
