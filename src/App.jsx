import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import TransactionsPage from './pages/TransactionPage';
import axios from 'axios';
import { useState } from 'react';
import { Infos } from './context/core';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export default function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [info, setInfo] = useState({ loading: false, user, percentage: 0 });
  // const navigate = useNavigate();
  return (
    <PagesContainer>
      <BrowserRouter>
        <Infos.Provider value={{ ...info, setInfo }}>
          <Routes>
            <Route path="/" element={<SigninPage />} />
            <Route path="/cadastro" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          </Routes>
        </Infos.Provider>
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`;
