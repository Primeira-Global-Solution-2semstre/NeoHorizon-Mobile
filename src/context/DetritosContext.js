import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { updateLocalDetrito, removeLocalDetrito } = require('../utils/detritosFallback');
import {
  getDetritos,
  getDetritoById,
  createDetrito,
  updateDetrito,
  removeDetrito,
} from '../services/api';

const sampleDetritos = [
  {
    id: 101,
    nome: 'Estágio Zeus-12',
    tipo: 'Foguete',
    altitude: 820,
    velocidade: 7.8,
    regiaoOrbital: 'LEO',
    riscoColisao: 'Alto',
    registros: [
      { id: 'r1', evento: 'Passagem de rastreio confirmada', data: '1h atrás' },
      { id: 'r2', evento: 'Ajuste de correção de órbita recomendado', data: '12h atrás' },
    ],
  },
  {
    id: 102,
    nome: 'Painel Solar Astra',
    tipo: 'Satélite',
    altitude: 35786,
    velocidade: 3.1,
    regiaoOrbital: 'GEO',
    riscoColisao: 'Médio',
    registros: [
      { id: 'r3', evento: 'Sinal nominal recebido', data: '6h atrás' },
      { id: 'r4', evento: 'Anomalia de energia registrada', data: '2h atrás' },
    ],
  },
  {
    id: 103,
    nome: 'Casca de motor Titan',
    tipo: 'Resíduo',
    altitude: 2200,
    velocidade: 7.4,
    regiaoOrbital: 'MEO',
    riscoColisao: 'Crítico',
    registros: [
      { id: 'r5', evento: 'Risco de colisão confirmado', data: '30m atrás' },
      { id: 'r6', evento: 'Orientação de manobra emitida', data: '15m atrás' },
    ],
  },
  {
    id: 104,
    nome: 'CubeSat Aurora',
    tipo: 'Satélite',
    altitude: 610,
    velocidade: 7.6,
    regiaoOrbital: 'LEO',
    riscoColisao: 'Baixo',
    registros: [
      { id: 'r7', evento: 'Rotina de verificação orbital concluída', data: '1 dia atrás' },
    ],
  },
];

export const DetritosContext = createContext();

export const DetritosProvider = ({ children }) => {
  const [detritos, setDetritos] = useState(sampleDetritos);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [skipRemoteSync, setSkipRemoteSync] = useState(false);

  const storeCache = async (data) => {
    try {
      await AsyncStorage.setItem('@NeoHorizon_detritos', JSON.stringify(data));
    } catch (err) {
      // cache failure should not block the app
    }
  };

  const loadCache = async () => {
    try {
      const cached = await AsyncStorage.getItem('@NeoHorizon_detritos');
      if (cached) {
        setDetritos(JSON.parse(cached));
      }
    } catch (err) {
      // ignore cache read errors
    }
  };

  const loadDetritos = async () => {
    if (skipRemoteSync) {
      setSkipRemoteSync(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getDetritos();
      setDetritos(data);
      storeCache(data);
      setError(null);
    } catch (err) {
      setError('Não foi possível carregar a lista de detritos.');
      if (!detritos || detritos.length === 0) {
        setDetritos(sampleDetritos);
        storeCache(sampleDetritos);
      }
      Alert.alert('Aviso', 'Não foi possível carregar os dados remotos. Usando dados de exemplo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCache();
    loadDetritos();
  }, []);

  const refreshDetritos = async () => {
    try {
      setRefreshing(true);
      const data = await getDetritos();
      setDetritos(data);
      setError(null);
    } catch (err) {
      setError('Falha no refresh dos detritos.');
    } finally {
      setRefreshing(false);
    }
  };

  const getDetrito = async (id) => {
    try {
      setLoading(true);
      const data = await getDetritoById(id);
      return data;
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível buscar os detalhes do detrito.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addDetrito = async (payload) => {
    try {
      setLoading(true);
      await createDetrito(payload);
      await loadDetritos();
      Alert.alert('Sucesso', 'Detrito cadastrado com sucesso.');
      return true;
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível cadastrar o detrito. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editDetrito = async (id, payload) => {
    const nextDetritos = updateLocalDetrito(detritos, id, payload);
    setDetritos(nextDetritos);
    setSkipRemoteSync(true);
    storeCache(nextDetritos);

    try {
      setLoading(true);
      await updateDetrito(id, payload);
      setError(null);
      Alert.alert('Sucesso', 'Dados do detrito atualizados.');
      return true;
    } catch (err) {
      setError('Atualização aplicada localmente.');
      Alert.alert('Sucesso', 'Os dados foram atualizados localmente.');
      return true;
    } finally {
      setLoading(false);
    }
  };

  const deleteDetrito = async (id) => {
    const nextDetritos = removeLocalDetrito(detritos, id);

    if (nextDetritos.length === detritos.length) {
      setError('Detrito nÃ£o encontrado para exclusÃ£o.');
      return false;
    }

    try {
      setLoading(true);
      setDetritos(nextDetritos);
      setSkipRemoteSync(true);
      await storeCache(nextDetritos);

      try {
        await removeDetrito(id);
        setError(null);
      } catch (remoteErr) {
        setError('ExclusÃ£o aplicada localmente. SincronizaÃ§Ã£o remota indisponÃ­vel.');
      }

      return true;
    } catch (err) {
      setError('Não foi possível excluir o detrito localmente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const alertas = detritos
    .filter((item) => item.riscoColisao === 'Alto' || item.riscoColisao === 'Crítico')
    .map((item) => ({
      id: item.id,
      nome: item.nome,
      nivel: item.riscoColisao,
      dataPrevista: item.riscoColisao === 'Crítico' ? '24h' : '72h',
      regiao: item.regiaoOrbital,
      status: item.riscoColisao === 'Crítico' ? 'Ativo' : 'Atenção',
    }));

  const metrics = {
    totalDetritos: detritos.length,
    totalAlertas: alertas.length,
    proximidadeRisco: alertas.length > 0 ? 'Próxima janela em 24h' : 'Órbita estável',
    porRegiao: detritos.reduce((acc, item) => {
      acc[item.regiaoOrbital] = (acc[item.regiaoOrbital] || 0) + 1;
      return acc;
    }, {}),
  };

  const indicadores = Object.entries(metrics.porRegiao).map(([regiao, total]) => ({
    regiao,
    descricao: `${total} detritos monitorados`,
    trend: regiao === 'LEO' ? 'Estável' : 'Atenção',
  }));

  const registros = detritos.flatMap((item) =>
    (item.registros || []).map((registro) => ({
      ...registro,
      detritoNome: item.nome,
      detritoId: item.id,
    }))
  );

  return (
    <DetritosContext.Provider
      value={{
        detritos,
        loading,
        refreshing,
        error,
        alertas,
        metrics,
        indicadores,
        registros,
        loadDetritos,
        refreshDetritos,
        getDetrito,
        addDetrito,
        editDetrito,
        deleteDetrito,
      }}
    >
      {children}
    </DetritosContext.Provider>
  );
};
