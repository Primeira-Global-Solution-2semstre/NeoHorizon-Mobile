export type RiskLevel = 'Baixo' | 'Médio' | 'Alto' | 'Crítico';

export interface Registro {
  id: string;
  evento: string;
  data: string;
}

export interface Detrito {
  id: number | string;
  nome: string;
  tipo: string;
  altitude: number;
  velocidade: number;
  regiaoOrbital: string;
  riscoColisao: RiskLevel;
  registros?: Registro[];
}

export interface DetritoPayload {
  nome: string;
  tipo: string;
  altitude: number;
  velocidade: number;
  regiaoOrbital: string;
  riscoColisao: RiskLevel;
}

export interface DetritoFormState {
  nome: string;
  tipo: string;
  altitude: string;
  velocidade: string;
  regiaoOrbital: string;
  riscoColisao: RiskLevel;
}

export interface Alerta {
  id: number | string;
  nome: string;
  nivel: RiskLevel;
  dataPrevista: string;
  regiao: string;
  status: string;
}

export interface MetricSummary {
  totalDetritos: number;
  totalAlertas: number;
  proximidadeRisco: string;
  porRegiao: Record<string, number>;
}

export interface Indicador {
  regiao: string;
  descricao: string;
  trend: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Detritos: undefined;
  CadastroDetrito: undefined;
  DetalhesDetrito: { id: number | string };
  EditarDetrito: { id: number | string };
  Alertas: undefined;
};

export interface DetritosContextValue {
  detritos: Detrito[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  alertas: Alerta[];
  metrics: MetricSummary;
  indicadores: Indicador[];
  registros: Array<Registro & { detritoNome: string; detritoId: number | string }>;
  loadDetritos: () => Promise<void>;
  refreshDetritos: () => Promise<void>;
  getDetrito: (id: number | string) => Promise<Detrito | null>;
  addDetrito: (payload: DetritoPayload) => Promise<boolean>;
  editDetrito: (id: number | string, payload: DetritoPayload) => Promise<boolean>;
  deleteDetrito: (id: number | string) => Promise<boolean>;
}