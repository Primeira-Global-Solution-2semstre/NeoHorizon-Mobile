# NeoHorizon Mobile

Aplicativo mobile desenvolvido com Expo, React Native e TypeScript para monitoramento e gerenciamento de detritos orbitais. O app apresenta uma visao geral dos objetos rastreados, alertas de risco de colisao, listagem com busca e filtros, alem de telas para cadastro, edicao, detalhes e remocao de registros.

# Integrantes:
- RAFAEL KUBAGAWA RAMOS, RM565572, 2TDSPO
- VINICIUS SOTERAS BRAGA, RM566230, 2TDSPO

## Funcionalidades

- Dashboard com metricas de detritos monitorados e alertas ativos.
- Mapa orbital visual com indicadores de regioes LEO, MEO e GEO.
- Listagem de detritos com busca por nome e filtro por tipo.
- Cadastro de novos detritos orbitais.
- Visualizacao de detalhes de cada detrito.
- Edicao e exclusao de registros.
- Tela de alertas gerada a partir dos niveis de risco `Alto` e `Critico`.
- Cache local com AsyncStorage para manter dados quando a API remota estiver indisponivel.
- Dados de exemplo como fallback para uso offline ou falha de carregamento remoto.

## Tecnologias

- Expo 49
- React Native 0.72
- React 18
- TypeScript
- React Navigation
- Axios
- AsyncStorage
- Expo Vector Icons

## Requisitos

- Node.js instalado
- npm instalado
- Expo CLI ou uso via `npx expo`
- Android Studio, emulador Android, Xcode/iOS Simulator ou aplicativo Expo Go em um dispositivo fisico

## Instalacao

Clone o repositorio e instale as dependencias:

```bash
npm install
```

## Como executar

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Executar diretamente no Android:

```bash
npm run android
```

Executar diretamente no iOS:

```bash
npm run ios
```

Executar no navegador:

```bash
npm run web
```

## Scripts disponiveis

```bash
npm start
```

Inicia o Expo Dev Server.

```bash
npm run android
```

Abre o app no Android.

```bash
npm run ios
```

Abre o app no iOS.

```bash
npm run web
```

Abre o app na versao web.

```bash
npm run typecheck
```

Executa a verificacao de tipos do TypeScript.

```bash
npm test
```

Executa os testes unitarios do fallback local de detritos.

## API

O app consome a API:

```txt
https://api.neohorizon.space
```

Endpoints utilizados:

- `GET /detritos`
- `GET /detritos/:id`
- `POST /detritos`
- `PUT /detritos/:id`
- `DELETE /detritos/:id`

Quando a API nao responde, o aplicativo usa cache local e dados de exemplo para manter a experiencia funcionando.

## Estrutura do projeto

```txt
.
├── App.tsx
├── app.json
├── assets/
├── src/
│   ├── components/
│   ├── context/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── styles/
│   ├── types/
│   └── utils/
├── package.json
└── tsconfig.json
```

## Principais pastas

- `src/screens`: telas principais do aplicativo.
- `src/components`: componentes reutilizaveis de interface.
- `src/context`: estado global dos detritos, alertas, metricas e operacoes de CRUD.
- `src/navigation`: configuracao das rotas do app.
- `src/services`: integracao com a API usando Axios.
- `src/styles`: arquivos de estilos separados por tela e componente.
- `src/types`: tipos TypeScript do dominio.
- `src/utils`: funcoes utilitarias e testes.

## Fluxo de telas

- `Splash`: tela inicial.
- `Home`: visao geral do monitoramento orbital.
- `Detritos`: lista, busca e filtro de objetos orbitais.
- `CadastroDetrito`: criacao de um novo registro.
- `DetalhesDetrito`: informacoes detalhadas de um detrito.
- `EditarDetrito`: atualizacao de dados.
- `Alertas`: riscos de colisao ativos.

## Testes e qualidade

Para validar tipos:

```bash
npm run typecheck
```

Para executar os testes:

```bash
npm test
```

## Licenca

Projeto privado.

# Video no Youtube

https://youtu.be/in9wW7Zwu60
