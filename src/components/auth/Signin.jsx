import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Infos, axios_instance } from '../../context/core';
import MyWalletLogo from '../MyWalletLogo';

export default function AuthSignin() {
  const { setInfo, ...rest } = useContext(Infos);
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();

    const info = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios_instance.post(`/auth/sign-in`, info)
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data));
        setInfo({user: data, ...rest})
        navigate('/home');
      })
      .catch((error) => {
        alert(error.response.data.message);
      }); // prettier-ignore
  };
  return (
    <form onSubmit={login}>
      <MyWalletLogo />
      <input data-test="email" placeholder="E-mail" type="email" name="email" />
      <input data-test="password" placeholder="Senha" type="password" autoComplete="new-password" name="password" />
      <button data-test="sign-in-submit" type="submit">
        Entrar
      </button>
    </form>
  );
}
