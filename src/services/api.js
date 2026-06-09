import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.neohorizon.space',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDetritos = async () => {
  const response = await api.get('/detritos');
  return response.data;
};

export const getDetritoById = async (id) => {
  const response = await api.get(`/detritos/${id}`);
  return response.data;
};

export const createDetrito = async (detrito) => {
  const response = await api.post('/detritos', detrito);
  return response.data;
};

export const updateDetrito = async (id, detrito) => {
  const response = await api.put(`/detritos/${id}`, detrito);
  return response.data;
};

export const removeDetrito = async (id) => {
  const response = await api.delete(`/detritos/${id}`);
  return response.data;
};

export default api;
