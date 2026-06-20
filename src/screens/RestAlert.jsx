import { useEffect } from 'react'
import { Coffee, Home, Bike } from 'lucide-react'
import { useApp, buzz } from '../context/AppState.jsx'
import { BigButton } from '../components/ui.jsx'
import { STATS } from '../data.js'

/* Aviso amigável de descanso — acionado (teoricamente) pelo Controle de Jornada quando o
   usuário ultrapassa a meta saudável de horas. NÃO força parar nem fecha o app: é só um
   lembrete de autocuidado. Cenário ilustrativo de jornada já excedida. */
const WORKED = '8h40'

export default function RestAlert() {
  const { go } = useApp()
  useEffect(() => { buzz([200, 100, 200]) }, [])

  return (
    <div className="screen">
      <div className="rest-screen">
        <div className="rest-emoji"><Coffee size={64} color="var(--warning)" /></div>
        <h2 style={{ fontSize: 'var(--fs-xl)' }}>Hora de descansar?</h2>
        <p className="muted" style={{ fontSize: 18, lineHeight: 1.4, maxWidth: 300 }}>
          Você já trabalhou <b style={{ color: 'var(--text)' }}>{WORKED}</b> hoje — acima da meta
          saudável de {STATS.healthyHours}h. Jornadas longas aumentam a fadiga e o risco de
          acidentes. Que tal encerrar por hoje?
        </p>

        <div className="card full" style={{ borderColor: 'var(--warning)' }}>
          <div className="row gap-12">
            <Bike size={22} color="var(--warning)" />
            <span style={{ fontWeight: 600, fontSize: 15, textAlign: 'left' }}>
              Cuidar de você também é segurança. A decisão é sempre sua.
            </span>
          </div>
        </div>

        <div className="full stack gap-12" style={{ marginTop: 6 }}>
          <BigButton variant="safe" icon={Home} onClick={() => go('home')}>Encerrar o dia</BigButton>
          <BigButton variant="outline" onClick={() => go('home')}>Continuar trabalhando</BigButton>
        </div>
      </div>
    </div>
  )
}
