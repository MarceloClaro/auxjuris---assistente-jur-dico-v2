# AUXJURIS – Assistente Jurídico  
### LLM Gemma 2B int8 em WebAssembly + MediaPipe

> Exemplo prático de um modelo de linguagem grande rodando “100 % no navegador”,  
> sem GPU dedicada, com desempenho aceitável em máquinas de baixa potência.

---

## 1. Introdução

O projeto **AUXJURIS – Assistente Jurídico** mostra como um **LLM** pode operar diretamente no dispositivo do usuário via **WebAssembly (WASM)** e **MediaPipe GenAI Tasks**, dispensando servidores externos e placas de vídeo.  
Modelo central: **`gemma2-2b-it-gpu-int8.bin`** (Gemma 2B “instruction-tuned”, quantizado em int8).

---

## 2. Modelo Gemma 2B int8

| Atributo | Descrição |
|----------|-----------|
| Arquivo  | `gemma2-2b-it-gpu-int8.bin` |
| Parâmetros | 2 B (quantizados para 8 bits) |
| Sufixo *it* | “Instruction Tuned” → segue instruções com coerência |
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

> Quantizar = representar pesos/ativações com menos bits (“int8” em vez de “float32”), gerando modelos menores, rápidos e com leve perda de qualidade — compensada pela execução local em hardware modesto.

---

© 2025 • Projeto AUXJURIS – uso acadêmico/demonstrativo.
