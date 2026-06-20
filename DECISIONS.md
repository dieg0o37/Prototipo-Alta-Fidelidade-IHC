# Registro de Decisões de Design — Protótipo de Alta Fidelidade (Fase 3)

**Disciplina:** MC750 — Construção de Interfaces Homem-Computador (IC/Unicamp, 2026s1)
**Equipe:** 244 — Diego Martins Santos, Manuel Eduardo Quispe Condori, Cassiano Martins
Oliveira Caro, Kauan Aprigio Estevão, Raoniton Adriano da Silva
**Produto:** *Alerta Motoboy* — app de segurança colaborativa para motoboys

> Este documento registra **todas as decisões tomadas no protótipo que não estavam
> explícitas nos relatórios das Fases 1 e 2**, com sua justificativa. Serve como fonte
> direta para a redação de `docs/fase-3/Fase 3.docx` (Seções 1, 2 e 3). Cada decisão indica
> em qual seção do relatório deve ser citada.

---

## 1. Método e ferramenta de prototipação → *Seção 1 (Metodologia)*

### D1. Uso de GenAI como método de prototipação
O protótipo foi produzido com **IA generativa (Claude Code)** a partir dos requisitos das
Fases 1 e 2. O grupo atuou como *direção de design*: definiu requisitos, restrições e
decisões; a IA gerou o código da interface; o grupo revisou e validou cada tela.
**Por quê:** é o método pedido para esta fase; permite iterar rápido e converter os
requisitos textuais diretamente em interface funcional.

### D2. Meio: protótipo CODADO (web app), não Figma — **mudança em relação à Fase 2**
A Fase 2 usou Figma. Na Fase 3 optou-se por um **protótipo interativo em código**
(React + Vite). **Por quê:**
- Só código demonstra de fato a **redundância de acessibilidade** central do projeto:
  bordas da tela **piscando**, **vibração** (feedback háptico) e **estado de escuta** por
  voz — animações que frames estáticos do Figma não reproduzem.
- Protótipo navegável de verdade (clicável) gera uma avaliação mais fiel da interação.
- Produz screenshots limpos e um demo ao vivo para o relatório e a apresentação.
- GenAI gera protótipos de mais alta qualidade utilizando código em vez de Figma.

### D3. Stack técnica
**React + Vite** (estrutura e build), **CSS com custom properties** (temas dia/noite) e
**lucide-react** (ícones universais). **Por quê:** stack leve, sem backend; CSS variables
são o jeito mais limpo de alternar tema de alto contraste; lucide oferece ícones
padronizados/universais (atende a restrição Semântica da Fase 1).

### D4. Mapa estilizado, sem API real
O mapa é um **SVG estilizado** com ruas, zonas de calor e pinos posicionados manualmente —
**sem Google Maps/geolocalização**. **Por quê:** é um protótipo de *interface*; integração
real de mapas não agrega à avaliação de usabilidade e adicionaria complexidade desnecessária.

### D5. Simulação de háptico e voz
- **Háptico:** dispara `navigator.vibrate()` em dispositivos compatíveis e, em todos os
  casos, mostra um **indicador visual de vibração** (redundância). No desktop o feedback é
  só visual — limitação assumida e documentada.
- **Voz:** o reconhecimento é **roteirizado** (texto pré-definido revelado com animação de
  escuta). **Por quê:** o objetivo é demonstrar o *fluxo* de comando de voz, não entregar
  ASR de produção.

---

## 2. Decisões de interface → *Seção 2 (Protótipos de Alta Fidelidade)*

### D6. ⭐ Síntese Minimalista + Eficiente: botão de pânico sempre visível — **mudança vs. Fase 2**
A Fase 2 consolidou o **Modelo Minimalista**, mantendo o botão de pânico *dentro* do menu
"+". Na Fase 3, **promovemos o botão de PÂNICO para sempre-visível** na tela principal,
mantendo todo o resto da filosofia Minimalista (mapa limpo, FAB "+" para as demais ações,
menu lateral para configurações).
**Por quê / por que é melhor:** resolve a **tensão central** registrada na Fase 1/2
(*simplicidade × imediatismo*) em vez de sacrificar um dos lados. O pânico é a única ação
verdadeiramente *time-critical*; exigir dois toques nele contradiz o requisito da Fase 1 de
"botão de pânico **sempre visível e de fácil acesso**". O risco de acionamento acidental —
motivo original de escondê-lo — é mitigado por: (a) **contagem regressiva de 3s com
cancelar** antes de disparar, e (b) hitbox dedicada e isolada no canto. Assim ganhamos
imediatismo *sem* devolver a poluição visual do Modelo Eficiente.

### D7. Tema dia/noite (toggle de alto contraste)
Dois temas: **claro** (legibilidade sob sol direto — cenário primário da restrição Física)
e **escuro** (turnos noturnos, apontados na coleta da Fase 1 como pico de risco —
noite/madrugada). **Por quê:** cobre os dois contextos reais de uso; o toggle fica visível
no topo da tela principal.

### D8. Cores semânticas fixas
Vermelho = perigo, amarelo = atenção, verde = seguro/confirmado — **constantes nos dois
temas**. **Por quê:** restrição Semântica da Fase 1 (cores de alerta universais); manter o
significado estável evita reaprendizado. Porém, não depende exclusivamente de cores (acessibilidade para pessoas com daltonismo): alertas críticos têm também **borda piscando**, **vibração** e **símbolos de alertas**.

### D9. Hitboxes grandes e tipografia ampliada
Botões primários ≥ **64 px**; botão de pânico ≥ **88 px**; corpo de texto ≥ 17 px.
**Por quê:** restrição Física/Sintática (trepidação do veículo, uso de luvas) — a Fase 2 já
apontava a trepidação como fator crítico para dimensionar alvos de toque. 64 px supera o
mínimo de 48 dp do Material Design.

### D10. Sem scroll vertical nas telas primárias; sem pop-ups pequenos
Mapa, alerta de aproximação, validação e pânico cabem **sem rolagem**. Alertas críticos usam
**overlay de tela cheia / bordas**, não pop-ups pequenos. Listas longas (histórico) ficam só
em telas secundárias. **Por quê:** restrição Sintática da Fase 1 (sem scroll, sem pop-ups,
sem menus escondidos em fluxos críticos).

### D11. Idioma pt-BR
Toda a UI em português do Brasil. **Por quê:** o público-alvo são motoboys brasileiros
(Fase 1: São Paulo e Campinas/Barão Geraldo).

### D12. Persona e cenário do protótipo: "Lucas", motoboy surdo
A jornada-guia reproduz o **storyboard da Fase 2** (Lucas, com deficiência auditiva):
Mapa → Alerta de aproximação (vibração + bordas piscando) → Rota alternativa → Validação.
**Por quê:** acessibilidade auditiva é caso de uso de primeira classe (Fase 1/2); o protótipo
precisa demonstrá-la de ponta a ponta.

### D13. Resumo por IA no histórico
A tela de Histórico por local mostra um **resumo gerado por IA** dos relatos (ex.: "portaria
costuma atrasar; relatos de tratamento hostil à noite"). **Por quê:** materializa a ideia da
Fase 1 de "IA que resume relatos para alertar futuros entregadores".

### D14. Funcionalidades prototipadas (10 telas = requisitos das Fases 1/2)
1. Mapa principal (riscos + zonas de calor) · 2. Ações rápidas "+" · 3. Denúncia por
categorias · 4. Comando de voz · 5. Alerta de aproximação (acessibilidade) · 6. Rota
alternativa · 7. Validação por crowdsourcing · 8. Pânico silencioso · 9. Chat de emergência
pré-configurado · 10. Menu/configurações + Histórico por local com mapa de calor.

### D15. Itens de UI auxiliares (preenchimento realista)
"Central 190", contagem de relatos, distâncias e tempos são **dados fictícios de
demonstração** para dar realismo às telas — não vêm de nenhuma base real
(centralizados em `src/data.js`).

### D16. Integração com o iFood (visão aspiracional) — *nova*
O menu traz **"Conectar conta iFood"**. O conceito ideal: ao aceitar uma corrida no iFood,
o app **assume automaticamente a mesma rota**, porém sobreposta aos **alertas de segurança**
da comunidade. No protótipo isso aparece como: integração ligada por padrão, **badge "iFood"**
no destino e o destino já "sincronizado" no topo do mapa.
**Por quê:** elimina retrabalho (o motoboy não redigita a rota) e leva a segurança para
dentro do fluxo real de trabalho, sem competir com a plataforma.
**Ressalva de viabilidade (honestidade acadêmica):** depende de API/parceria com o iFood que
**pode não existir** ou ser restrita; está modelada como *visão de produto ideal*, não como
funcionalidade garantida. Alternativa realista: captura via notificação/acessibilidade do
sistema, a validar em fases futuras.

### D17. Dropdown de destino + resumo IA no topo (substitui a localização estática) — *nova*
exibi um **dropdown (aberto por padrão)** com **nome do destino**, endereço, 
**resumo por IA das ocorrências** daquele local e um *pill* "4 alertas na rota ·
AO VIVO". **Por quê:** o que importa para o motoboy é o **destino** e seus riscos conhecidos,
não onde ele já está; materializa de novo a "IA que resume relatos" (Fase 1) no momento mais
útil. É recolhível para liberar o mapa quando desejado.

### D19. *Stat tracker* de jornada no perfil — *nova*
O menu/perfil exibe **estatísticas de trabalho**: corridas no total, entregas hoje, entregas
**neste destino** e **horas trabalhadas hoje**, com uma **barra de controle de jornada**
(meta saudável de 8h; fica âmbar perto do limite). **Por quê:** dá ao app apelo de
acompanhamento de trabalho e, principalmente, cria um **mecanismo de controle de jornada para
evitar overworking** — diálogo direto com o problema da Fase 1 (uberização, jornadas de 12h+,
fadiga como fator de risco). São dados ilustrativos, sem persistência.

---

## 3. Pontos para a análise → *Seção 3 (Análise de Resultados)*

- O protótipo materializa a transição de **segurança individual → rede de apoio coletiva**
  (problema-raiz da Fase 1: responsabilidade de segurança transferida ao trabalhador).
- A redundância **visual + háptica** atende o usuário surdo sem prejudicar os demais
  (resolve o dilema da Fase 2: "alertar quem não ouve sem estressar quem ouve").
- A síntese do botão de pânico (D6) demonstra como a interface equilibra
  *simplicidade × imediatismo* — a tensão de design central do projeto.
- Pontos a validar com usuários reais em fases seguintes: legibilidade efetiva sob sol;
  taxa de acionamento acidental do pânico mesmo com a contagem regressiva; carga cognitiva
  do mapa com muitos alertas simultâneos.

---

## Limitações conhecidas (assumidas)
- Vibração real só em dispositivos compatíveis (no desktop, feedback apenas visual).
- Reconhecimento de voz roteirizado (não é ASR real).
- Mapa e dados são ilustrativos; não há backend, login nem persistência.
