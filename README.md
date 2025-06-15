# AUXJURIS – Assistente Jurídico  
### LLM Gemma 2B int8 em WebAssembly + MediaPipe

> Exemplo prático de um modelo de linguagem grande rodando "100 % no navegador",  
> sem GPU dedicada, com desempenho aceitável em máquinas de baixa potência.

---

## 1. Introdução

O projeto **AUXJURIS – Assistente Jurídico** mostra como um **LLM** pode operar diretamente no dispositivo do usuário via **WebAssembly (WASM)** e **MediaPipe GenAI Tasks**, dispensando servidores externos e placas de vídeo.  
Modelo central: **`gemma2-2b-it-gpu-int8.bin`** (Gemma 2B "instruction-tuned", quantizado em int8).

---

## 2. Modelo Gemma 2B int8

| Atributo | Descrição |
|----------|-----------|
| Arquivo  | `gemma2-2b-it-gpu-int8.bin` |
| Parâmetros | 2 B (quantizados para 8 bits) |
| Sufixo *it* | "Instruction Tuned" → segue instruções com coerência |
| Sufixo *gpu* | Pode usar GPU se houver, mas funciona integralmente em CPU |
| Quantização | INT8 – pesos e ativações em 8 bits |

### Por que quantização int8?

- **Arquivo menor** – download e armazenamento reduzidos.  
- **Menos RAM** – cabe em máquinas com pouca memória.  
- **Cálculo mais rápido** – inteiros em CPU ≈ mais eficientes que float32.

---

## 3. Tecnologia habilitadora

### 3.1 WebAssembly (WASM)  
Executa binários de baixo nível quase na velocidade nativa dentro do navegador.

### 3.2 MediaPipe GenAI Tasks  
API da Google que carrega, gerencia e infere LLMs otimizados on-device.

---

## 4. Vantagens on-device em CPU

| Benefício | Impacto |
|-----------|---------|
| Independência de servidor | Funciona sem internet. |
| Latência ultrabaixa | Resposta quase instantânea. |
| Custos zero de inferência | Nenhum gasto com nuvem ou API. |
| Privacidade | Dados permanecem locais. |
| Acessibilidade | Roda em laptops antigos e dispositivos sem GPU. |
| Uso offline | Após cache inicial, continua operando sem rede. |

---

## 5. Limitações

| Desafio | Detalhes |
|---------|----------|
| **CPU x Modelos grandes** | Gemma 2B é viável; 7B/13B podem ficar lentos ou inviáveis. |
| **Tempo de carregamento** | Primeiro load precisa baixar WASM + modelo (centenas de MB). |
| **Depuração complexa** | Envolve JavaScript → WASM → MediaPipe, além de diferenças entre navegadores. |
| **Avisos de console** | Mensagens sobre powerPreference, setInterval lento, etc., indicam ajustes futuros. |
| **Qualidade vs. Quantização** | INT8 pode degradar ligeiramente a precisão comparado a float32. |

---

## 6. Resumo técnico

| Item | Especificação |
|------|---------------|
| Objetivo | Assistência jurídica privativa e de baixa latência no navegador |
| LLM | Gemma 2B int8 |
| Runtime | WebAssembly |
| Framework | MediaPipe GenAI Tasks |
| Plataforma alvo | Navegadores modernos em CPUs de baixa/média potência |
| Paradigma | Inferência on-device |
| Principais ganhos | Privacidade, latência mínima, zero custos de servidor |
| Principais limites | CPU mais lenta que GPU, download inicial pesado |

---

### Referência rápida de quantização

> Quantizar = representar pesos/ativações com menos bits ("int8" em vez de "float32"), gerando modelos menores, rápidos e com leve perda de qualidade — compensada pela execução local em hardware modesto.

---

## 7. Estrutura e Fluxo de Arquivos para Estudo

Para entender o funcionamento interno do projeto, siga a estrutura de arquivos e o fluxo de dados/lógica:

### 7.1. Estrutura de Diretórios Essenciais

```
auxjuris---assistente-jurídico-v2/
├── public/
│   └── wasm_files/               # Contém os arquivos WebAssembly (WASM) da MediaPipe
│       ├── genai_wasm_internal.js
│       └── genai_wasm_internal.wasm
├── services/
│   └── llmService.ts             # Lógica central para inicialização e inferência do LLM
├── components/                   # Componentes React (ChatInput, ChatMessageItem, Sidebar, etc.)
├── App.tsx                       # Componente React principal
├── constants.ts                  # Constantes do projeto (caminhos de arquivos, configurações do LLM)
├── gemma2-2b-it-gpu-int8.bin     # Arquivo do modelo LLM
├── index.html                    # Ponto de entrada HTML
├── index.tsx                     # Ponto de entrada React (renderiza App.tsx)
├── package.json                  # Dependências e scripts do projeto (incluindo Vite)
├── tsconfig.json                 # Configurações do TypeScript
└── vite.config.ts                # Configurações do Vite para build e desenvolvimento
```

### 7.2. Fluxo de Inicialização e Interação do LLM

1.  **`index.html`**: É o arquivo HTML principal que o navegador carrega. Ele referencia `index.tsx` como um módulo (`<script type="module" src="/index.tsx"></script>`).
2.  **`index.tsx`**: Este arquivo é o ponto de entrada da aplicação React. Ele renderiza o componente `<App />` no elemento `div` com `id="root"`.
3.  **`App.tsx`**: É o componente React raiz da aplicação.
    *   Gerencia o estado global (mensagens do chat, status de carregamento, agente selecionado).
    *   No `useEffect` inicial, verifica se o LLM já está inicializado (`!isLlmInitialized()`).
    *   Chama a função assíncrona `initializeLlm` de `services/llmService.ts` para carregar o modelo.
    *   Após a inicialização, `App.tsx` chama `generateLlmResponse` (também de `services/llmService.ts`) para interagir com o modelo sempre que o usuário envia uma mensagem.
4.  **`services/llmService.ts`**: Este é o coração da integração com o LLM.
    *   A função `initializeLlm` é responsável por:
        *   Utilizar `FilesetResolver.forGenAiTasks(MP_WASM_ASSET_PATH)` para carregar os arquivos WASM (`genai_wasm_internal.js`, `genai_wasm_internal.wasm`) localizados em `public/wasm_files/`. O caminho `MP_WASM_ASSET_PATH` é definido em `constants.ts`.
        *   Inicializar a instância do `LlmInference` da MediaPipe, passando o caminho do arquivo do modelo (`MODEL_ASSET_PATH`, que aponta para `gemma2-2b-it-gpu-int8.bin` na raiz do projeto, conforme definido em `constants.ts`).
    *   A função `generateLlmResponse` envia o prompt do usuário para a instância do LLM inicializada e retorna a resposta.
5.  **`constants.ts`**: Contém variáveis de configuração cruciais, como `MODEL_FILENAME` (o nome do arquivo `.bin` do modelo LLM) e `MP_WASM_ASSET_PATH` (o caminho para a pasta que contém os arquivos WASM).
6.  **`public/wasm_files/`**: Esta pasta deve conter os arquivos `.wasm` e `.js` da MediaPipe necessários para que o WebAssembly seja carregado corretamente no navegador.
7.  **`gemma2-2b-it-gpu-int8.bin`**: O arquivo binário do modelo LLM quantizado. É carregado diretamente no navegador pelo `llmService.ts`.

Este fluxo garante que o LLM e seus componentes WASM sejam carregados e inicializados corretamente no navegador, permitindo a inferência on-device.

© 2025 • Projeto AUXJURIS – uso acadêmico/demonstrativo.
