import { useEffect } from 'react'
import { ShieldAlert, CornerUpRight, Eye } from 'lucide-react'
import { useApp, buzz } from '../context/AppState.jsx'
import MapCanvas from '../components/MapCanvas.jsx'
import { BigButton, ScreenBorderAlert, HapticIndicator } from '../components/ui.jsx'

/* Alerta de aproximação — redundância total (visual + háptico + texto),
   sem depender de som. Peça central da acessibilidade (motoboy surdo). */
export default function ProximityAlert() {
  const { go, setRouteRerouted } = useApp()

  useEffect(() => { buzz([200, 100, 200, 100, 400]) }, []) // padrão "área de risco"

  function reroute() {
    setRouteRerouted(true)
    go('altRoute')
  }

  return (
    <div className="screen">
      <div className="screen-body">
        <MapCanvas />
        <ScreenBorderAlert level="danger" />

        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 24 }}>
          <div className="card" style={{ borderColor: 'var(--danger)', borderWidth: 2 }}>
            <div className="row gap-12" style={{ marginBottom: 8 }}>
              <span className="cat-ico" style={{ background: 'var(--danger)' }}><ShieldAlert size={28} color="#fff" /></span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 20 }}>Área de risco à frente</div>
                <div className="muted">Assaltos frequentes · 180 m · relatado por 7 motoboys</div>
              </div>
            </div>
            <div className="row between" style={{ margin: '10px 0 14px' }}>
              <HapticIndicator label="Vibração: área de risco" />
              <span className="row gap-8 muted" style={{ fontSize: 14 }}><Eye size={16} /> Borda piscando</span>
            </div>
            <div className="stack gap-12">
              <BigButton variant="safe" icon={CornerUpRight} onClick={reroute}>Desviar — rota mais segura</BigButton>
              <BigButton variant="outline" onClick={() => go('home')}>Seguir mesmo assim</BigButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
