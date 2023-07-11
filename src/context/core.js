import axios from 'axios';
import { createContext } from 'react';

export const Infos = createContext({});
export const axios_instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});