# Alerta Motoboy — Protótipo de Alta Fidelidade (Fase 3)

Protótipo interativo do app de **segurança colaborativa para motoboys** da Equipe 244
(MC750 — Construção de Interfaces Homem-Computador, IC/Unicamp).
Inspirado no Waze, independente das plataformas de entrega, com alertas em tempo real,
validação por crowdsourcing e foco em acessibilidade (motoboys com deficiência auditiva).

> Decisões de design e justificativas: ver **[DECISIONS.md](./DECISIONS.md)** — é a fonte
> para preencher o relatório `docs/fase-3/Fase 3.docx`.

## Como rodar

Requer Node.js 18+.

```bash
cd prototipo
npm install
npm run dev      # abre em http://localhost:5173
```

Build de produção: `npm run build` · pré-visualizar build: `npm run preview`.

## Como navegar

- O app aparece dentro de uma **moldura de celular**.
- A **barra de botões abaixo do celular** (Mapa, Alerta de risco, Rota segura, …) serve só
  para pular entre as telas e capturar screenshots — **não faz parte do app**.
- **Jornada do Lucas** (storyboard da Fase 2), na ordem:
  **Mapa → Alerta de risco → (Desviar) → Rota segura → Validação**.
- O **toggle dia/noite** (sol/lua) fica no topo da tela do Mapa.

## Telas (10)

| # | Tela | Requisito atendido |
|---|------|--------------------|
| 1 | Mapa principal | mapa de risco em tempo real + zonas de calor |
| 2 | Ações rápidas "+" | denúncia/voz/chat em poucos toques |
| 3 | Denúncia por categoria | registrar ocorrência com ícones universais |
| 4 | Comando de voz | reportar sem tirar as mãos do guidão |
| 5 | Alerta de aproximação | notificação visual + háptica (acessibilidade) |
| 6 | Rota alternativa | desvio de área de risco |
| 7 | Validação (crowdsourcing) | confirmar alerta com 1 toque |
| 8 | Pânico silencioso | acionar rede de apoio sem som local |
| 9 | Chat de emergência | mensagens pré-configuradas (def. auditiva/fala) |
| 10 | Menu + Histórico | configurações, acessibilidade, mapa de calor, resumo por IA |

## Capturando telas para o relatório

1. `npm run dev`.
2. Selecione a tela na barra inferior (ou siga a jornada do Lucas).
3. Alterne dia/noite no Mapa para registrar os dois temas.
4. Capture a área da **moldura do celular** (recomenda-se viewport ~460×1000).

## Stack

React + Vite · CSS custom properties (temas) · lucide-react (ícones). Sem backend.
