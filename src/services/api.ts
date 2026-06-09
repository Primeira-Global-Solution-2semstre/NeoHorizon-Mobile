import axios from 'axios';
import type { Detrito, DetritoPayload } from '../types/domain';

const api = axios.create({
  baseURL: 'https://api.neohorizon.space',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDetritos = async (): Promise<Detrito[]> => {
  const response = await api.get<Detrito[]>('/detritos');
  return response.data;
};

export const getDetritoById = async (id: string | number): Promise<Detrito> => {
  const response = await api.get<Detrito>(`/detritos/${id}`);
  return response.data;
};

export const createDetrito = async (detrito: DetritoPayload): Promise<unknown> => {
  const response = await api.post('/detritos', detrito);
  return response.data;
};

export const updateDetrito = async (id: string | number, detrito: DetritoPayload): Promise<unknown> => {
  const response = await api.put(`/detritos/${id}`, detrito);
  return response.data;
};

export const removeDetrito = async (id: string | number): Promise<unknown> => {
  const response = await api.delete(`/detritos/${id}`);
  return response.data;
};

export default api;