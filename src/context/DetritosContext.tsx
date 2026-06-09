import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateLocalDetrito, removeLocalDetrito } from '../utils/detritosFallback';
import type {
  Alerta,
  Detrito,
  DetritoPayload,
  DetritosContextValue,
  Indicador,
  MetricSummary,
  Registro,
  RiskLevel,
} from '../types/domain';
import {
  getDetritos,
  getDetritoById,
  createDetrito,
  updateDetrito,
  removeDetrito,
} from '../services/api';

const sampleDetritos: Detrito[] = [
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
    registros: [{ id: 'r7', evento: 'Rotina de verificação orbital concluída', data: '1 dia atrás' }],
  },
];

export const DetritosContext = createContext<DetritosContextValue | undefined>(undefined);

export const useDetritosContext = () => {
  const context = useContext(DetritosContext);

  if (!context) {
    throw new Error('useDetritosContext must be used within DetritosProvider');
  }

  return context;
};

export const DetritosProvider = ({ children }: { children: React.ReactNode }) => {
  const [detritos, setDetritos] = useState<Detrito[]>(sampleDetritos);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skipRemoteSync, setSkipRemoteSync] = useState(false);

  const storeCache = async (data: Detrito[]) => {
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
        setDetritos(JSON.parse(cached) as Detrito[]);
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
      await storeCache(data);
      setError(null);
    } catch (err) {
      setError('Não foi possível carregar a lista de detritos.');
      if (!detritos || detritos.length === 0) {
        setDetritos(sampleDetritos);
        await storeCache(sampleDetritos);
      }
      Alert.alert('Aviso', 'Não foi possível carregar os dados remotos. Usando dados de exemplo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCache();
    void loadDetritos();
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

  const getDetrito = async (id: string | number) => {
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

  const addDetrito = async (payload: DetritoPayload) => {
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

  const editDetrito = async (id: string | number, payload: DetritoPayload) => {
    const nextDetritos = updateLocalDetrito(detritos, id, payload) as Detrito[];
    setDetritos(nextDetritos);
    setSkipRemoteSync(true);
    await storeCache(nextDetritos);

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

  const deleteDetrito = async (id: string | number) => {
    const nextDetritos = removeLocalDetrito(detritos, id) as Detrito[];

    if (nextDetritos.length === detritos.length) {
      setError('Detrito não encontrado para exclusão.');
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
        setError('Exclusão aplicada localmente. Sincronização remota indisponível.');
      }

      return true;
    } catch (err) {
      setError('Não foi possível excluir o detrito localmente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const alertas: Alerta[] = detritos
    .filter((item) => item.riscoColisao === 'Alto' || item.riscoColisao === 'Crítico')
    .map((item) => ({
      id: item.id,
      nome: item.nome,
      nivel: item.riscoColisao,
      dataPrevista: item.riscoColisao === 'Crítico' ? '24h' : '72h',
      regiao: item.regiaoOrbital,
      status: item.riscoColisao === 'Crítico' ? 'Ativo' : 'Atenção',
    }));

  const porRegiao = detritos.reduce<Record<string, number>>((accumulator, item) => {
    accumulator[item.regiaoOrbital] = (accumulator[item.regiaoOrbital] ?? 0) + 1;
    return accumulator;
  }, {});

  const metrics: MetricSummary = {
    totalDetritos: detritos.length,
    totalAlertas: alertas.length,
    proximidadeRisco: alertas.length > 0 ? 'Próxima janela em 24h' : 'Órbita estável',
    porRegiao,
  };

  const indicadores: Indicador[] = Object.entries(metrics.porRegiao).map(([regiao, total]) => ({
    regiao,
    descricao: `${total} detritos monitorados`,
    trend: regiao === 'LEO' ? 'Estável' : 'Atenção',
  }));

  const registros: Array<Registro & { detritoNome: string; detritoId: number | string }> = detritos.flatMap(
    (item) =>
      (item.registros ?? []).map((registro) => ({
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