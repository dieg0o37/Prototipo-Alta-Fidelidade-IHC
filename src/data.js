/* Dados ilustrativos compartilhados entre telas (sem backend).
   Mantém Home, Menu e Histórico consistentes entre si. */

// Destino da corrida ativa (sincronizado da integração iFood — ver DECISIONS D16/D17)
export const DESTINATION = {
  name: 'Cond. Residencial Vila Verde',
  address: 'R. das Acácias, 120 — Barão Geraldo',
  aiSummary: 'Portaria costuma atrasar a liberação; relatos de tratamento hostil à noite. Use a entrada de serviço.',
  timesDelivered: 14,
}

// Estatísticas de jornada do usuário (stat tracker — ver DECISIONS D19)
export const STATS = {
  totalRides: 1248,   // corridas no total
  today: 9,           // entregas hoje
  hoursToday: 6.3,    // horas trabalhadas hoje (6h20)
  hoursLabel: '6h20',
  healthyHours: 8,    // meta saudável de jornada
}
