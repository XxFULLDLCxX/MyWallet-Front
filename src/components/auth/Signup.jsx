import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Infos } from '../../context/core';
import MyWalletLogo from '../MyWalletLogo';

export default function AuthSignup() {
  const navigate = useNavigate();
  const { loading, setInfo, ...rest } = useContext(Infos);

  const signup = (e) => {
    e.preventDefault();
    console.log(e.target.password.value, e.target.confirmPassword.value);
    if (e.target.password.value !== e.target.confirmPassword.value) {
      return alert('"Senha" e "Confirme a Senha" devem ser iguais.');
    }
    setInfo({ ...rest, loading: true });

    const info = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios.post(`/auth/sign-up`, info)
      .then(() => {
        navigate('/');
        setInfo({ ...rest, loading: false });
      })
      .catch((error) => {
        setInfo({ ...rest, loading: false });
        alert(error.response.data.message);
      }); // prettier-ignore
  };
  return (
    <form onSubmit={signup}>
      <MyWalletLogo />
      <input placeholder="Nome" type="text" name="name" />
      <input placeholder="E-mail" type="email" name="email" />
      <input placeholder="Senha" type="password" autoComplete="new-password" name="password" />
      <input placeholder="Confirme a senha" type="password" autoComplete="new-password" name="confirmPassword" />
      <button type="submit">Cadastrar</button>
    </form>
  );
}