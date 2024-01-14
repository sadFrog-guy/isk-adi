import { useQuery } from 'react-query';
import api from '../services/api';

export const fetchClients = () => {
  return api.get('/sklad/queryUsers?search').then((res) => res.data);
}

export const useClients = () => {
  return useQuery('clients', () => fetchClients(), { enabled: true });
};
