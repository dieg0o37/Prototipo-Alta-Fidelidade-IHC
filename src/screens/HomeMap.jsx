import { Menu, Plus, Layers, Crosshair, Mic } from 'lucide-react'
import { useApp } from '../context/AppState.jsx'
import MapCanvas from '../components/MapCanvas.jsx'
import { ThemeSwitch } from '../components/ui.jsx'

export default function HomeMap() {
  const { go, setSheetOpen, routeRerouted } = useApp()
  return (
    <div className="screen">
      <div className="screen-body">
        <MapCanvas rerouted={routeRerouted} />

        {/* Topo: menu lateral + busca/tema (base Minimalista) */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="map-control" onClick={() => go('menu')} aria-label="Menu">
            <Menu size={26} />
          </button>
          <div className="card grow row gap-8" style={{ padding: '12px 14px', boxShadow: 'var(--shadow)' }}>
            <Crosshair size={20} className="muted" />
            <span className="muted">Barão Geraldo, Campinas</span>
          </div>
          <ThemeSwitch />
        </div>

        {/* Controles laterais direita */}
        <div style={{ position: 'absolute', right: 12, bottom: 210, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="map-control" aria-label="Camadas de risco"><Layers size={24} /></button>
          <button className="map-control" aria-label="Centralizar"><Crosshair size={24} /></button>
        </div>

        {/* Card de status da rota */}
        <div style={{ position: 'absolute', left: 12, right: 12, bottom: 110 }}>
          <div className="card row between" style={{ padding: '12px 16px' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>4 alertas na sua rota</div>
              <div className="muted" style={{ fontSize: 14 }}>2 perigos · 2 atenção · atualizado agora</div>
            </div>
            <span className="badge" style={{ background: 'var(--safe)' }}>AO VIVO</span>
          </div>
        </div>

        {/* Barra de ações inferior: FAB "+" central + PÂNICO sempre visível (síntese) */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 22px 26px',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <button className="map-control" style={{ width: 64, height: 64 }} onClick={() => go('voice')} aria-label="Comando de voz">
            <Mic size={28} />
          </button>

          <button className="fab" style={{ width: 80, height: 80 }} onClick={() => setSheetOpen(true)} aria-label="Ações rápidas">
            <Plus size={40} />
          </button>

          <button className="panic-fab" onClick={() => go('panic')} aria-label="Botão de pânico">
            <span style={{ fontSize: 22, lineHeight: 1 }}>!</span>
            <span>PÂNICO</span>
          </button>
        </div>
      </div>
    </div>
  )
}
