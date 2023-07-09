import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Infos } from '../../context/core';
import MyWalletLogo from '../MyWalletLogo';
import axios from 'axios';

export default function AuthSignin() {
  const { setInfo, ...rest } = useContext(Infos);
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();

    const info = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios.post(`/auth/sign-in`, info)
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data));
        setInfo({user: data, ...rest})
        navigate('/home');
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
