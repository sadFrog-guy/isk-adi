import { useQuery } from 'react-query';
import api from '../services/api';

export const fetchClients = () => {
  return api.get('/api/getClients').then((res) => res.data.objects);
}

export const useClients = () => {
  return useQuery('clients', () => fetchClients(), { enabled: true });
};
