import { ShieldCheck, ThumbsUp } from 'lucide-react'
import { useApp } from '../context/AppState.jsx'
import MapCanvas from '../components/MapCanvas.jsx'
import { BigButton } from '../components/ui.jsx'

/* Rota alternativa traçada desviando da zona de risco. */
export default function AltRoute() {
  const { go } = useApp()
  return (
    <div className="screen">
      <div className="screen-body">
        <MapCanvas rerouted showHeat />

        <div style={{ position: 'absolute', top: 16, left: 14, right: 14 }}>
          <div className="card row gap-12" style={{ borderColor: 'var(--safe)', borderWidth: 2 }}>
            <ShieldCheck size={34} color="var(--safe)" />
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Rota mais segura ativada</div>
              <div className="muted" style={{ fontSize: 14 }}>+2 min · evita 1 área de risco</div>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 24 }}>
          <BigButton variant="info" icon={ThumbsUp} onClick={() => go('validate')}>Continuar</BigButton>
        </div>
      </div>
    </div>
  )
}
