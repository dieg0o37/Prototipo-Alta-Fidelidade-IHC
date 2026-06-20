import { CheckCircle2, Home } from 'lucide-react'
import { useApp } from '../context/AppState.jsx'
import { BigButton, HapticIndicator } from '../components/ui.jsx'

/* Confirmação rápida da denúncia (feedback visual + háptico). */
export default function ReportDone() {
  const { go, lastReport } = useApp()
  return (
    <div className="screen">
      <div className="screen-body col-center" style={{ padding: 28, gap: 18 }}>
        <CheckCircle2 size={96} color="var(--safe)" />
        <h2 style={{ fontSize: 'var(--fs-xl)' }}>Denúncia enviada</h2>
        <p className="muted" style={{ fontSize: 18 }}>
          {lastReport ? <><b>{lastReport.label}</b> já está visível para os motoboys próximos.</> : 'Risco compartilhado com a comunidade.'}
        </p>
        <HapticIndicator label="Confirmação por vibração" />
        <div className="full stack gap-12" style={{ marginTop: 12 }}>
          <BigButton variant="info" icon={Home} onClick={() => go('home')}>Voltar ao mapa</BigButton>
        </div>
      </div>
    </div>
  )
}
