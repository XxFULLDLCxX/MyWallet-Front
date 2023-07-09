import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import TransactionsPage from './pages/TransactionPage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Infos } from './context/core';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export default function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();
  const [info, setInfo] = useState(user ? { user } : {});
  useEffect(() => {
    if (!user && location.pathname !== '/cadastro') navigate('/');
  }, []);
  // if (!localStorage.user) return <>Oh no, my Queen!</>;

  return (
    <PagesContainer>
      <Infos.Provider value={{ ...info, setInfo }}>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/cadastro" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
        </Routes>
      </Infos.Provider>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`;
