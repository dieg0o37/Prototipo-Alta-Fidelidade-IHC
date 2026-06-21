# Alerta Motoboy — Protótipo de Alta Fidelidade (Fase 3)

Protótipo interativo do app de **segurança colaborativa para motoboys** da Equipe 244
(MC750 — Construção de Interfaces Homem-Computador, IC/Unicamp).
Inspirado no Waze, independente das plataformas de entrega, com alertas em tempo real,
validação por crowdsourcing e foco em acessibilidade (motoboys com deficiência auditiva).

> Decisões de design e justificativas: ver **[DECISIONS.md](./DECISIONS.md)** — é a fonte

## Como rodar

Este projeto requer Node.js 18+.Caso já tenha pode ignorar essa sessão. Escolha o comando de acordo com sua distro:

**Arch Linux / Manjaro**
\`\`\`bash
sudo pacman -S nodejs npm
\`\`\`

**Ubuntu / Debian**
\`\`\`bash
sudo apt update
sudo apt install nodejs npm
\`\`\`

**Fedora**
\`\`\`bash
sudo dnf install nodejs npm
\`\`\`

**openSUSE**
\`\`\`bash
sudo zypper install nodejs npm
\`\`\`

> **Nota:** os repositórios oficiais de algumas distros (especialmente Debian/Ubuntu) podem trazer versões antigas do Node. Se `node -v` mostrar uma versão menor que 18, use o [nvm](https://github.com/nvm-sh/nvm) para instalar uma versão mais recente:
> \`\`\`bash
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
> nvm install 18
> \`\`\`

Confirme a instalação com:
\`\`\`bash
node -v
npm -v
\`\`\`

```bash
npm install
npm run dev      # abre em http://localhost:5173
```

Build de produção: `npm run build` · pré-visualizar build: `npm run preview`.

## Como navegar

- O app aparece dentro de uma **moldura de celular**.
- A **barra de botões abaixo do celular** (Mapa, Alerta de risco, Rota segura, …) serve só
  para pular entre as telas e capturar screenshots — **não faz parte do app**.
- **Jornada do Lucas** (storyboard da Fase 2), na ordem:
  **Mapa → Alerta de risco → (Desviar) → Rota segura → Validação** (pop-up Waze; responder é
  opcional — some sozinho em ~6 s).
- O **toggle dia/noite** (sol/lua) fica no **Menu → Aparência**.
- O topo do mapa traz um **dropdown de destino** (aberto por padrão) com o resumo por IA das
  ocorrências do local; o destino vem "sincronizado" da **integração iFood** (Menu).

## Telas (11)

| # | Tela | Requisito atendido |
|---|------|--------------------|
| 1 | Mapa principal | mapa de risco em tempo real + zonas de calor + dropdown de destino (resumo IA) |
| 2 | Ações rápidas "+" | denúncia/voz/chat em poucos toques |
| 3 | Denúncia por categoria | registrar ocorrência com ícones universais |
| 4 | Comando de voz | reportar sem tirar as mãos do guidão |
| 5 | Alerta de aproximação | notificação visual + háptica (acessibilidade) |
| 6 | Rota alternativa | desvio de área de risco |
| 7 | Validação (crowdsourcing) | pop-up transitório estilo Waze, some sozinho (não bloqueia) |
| 8 | Pânico silencioso | acionar rede de apoio sem som local |
| 9 | Chat de emergência | mensagens pré-configuradas (def. auditiva/fala) |
| 10 | Menu + Histórico | estatísticas de jornada, integração iFood, tema, acessibilidade, histórico + resumo por IA |
| 11 | Aviso de descanso | lembrete amigável de overworking (não força parar) |

## Capturando telas para o relatório

1. `npm run dev`.
2. Selecione a tela na barra inferior (ou siga a jornada do Lucas).
3. Alterne dia/noite em **Menu → Aparência** para registrar os dois temas.
4. Capture a área da **moldura do celular** (recomenda-se viewport ~460×1000).

## Stack

React + Vite · CSS custom properties (temas) · lucide-react (ícones). Sem backend.
