import { useState } from 'react'
import { Menu, Plus, Layers, Crosshair, Mic, ChevronUp, ChevronDown, Sparkles, History } from 'lucide-react'
import { useApp } from '../context/AppState.jsx'
import { DESTINATION } from '../data.js'
import MapCanvas from '../components/MapCanvas.jsx'

export default function HomeMap() {
  const { go, setSheetOpen, routeRerouted, ifoodConnected } = useApp()
  const [open, setOpen] = useState(true) // dropdown de destino aberto por padrão

  return (
    <div className="screen">
      <div className="screen-body">
        <MapCanvas rerouted={routeRerouted} />
        <div className="map-scrim" />

        {/* Topo: menu lateral + dropdown de destino (base Minimalista) */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <button className="map-control" onClick={() => go('menu')} aria-label="Menu">
            <Menu size={26} />
          </button>

          <div className="dest-card grow">
            <button className="dest-head" onClick={() => setOpen(!open)} aria-expanded={open}>
              {ifoodConnected && <span className="ifood-badge">iFOOD</span>}
              <div className="title grow">{DESTINATION.name}</div>
              {open ? <ChevronUp size={22} className="muted" /> : <ChevronDown size={22} className="muted" />}
            </button>
            {open && (
              <div className="dest-body">
                <div className="muted" style={{ fontSize: 13 }}>{DESTINATION.address}</div>
                <div className="row gap-8" style={{ fontSize: 13, fontWeight: 600 }}>
                  <History size={14} className="muted" />
                  <span>Você já entregou aqui <b>{DESTINATION.timesDelivered}×</b></span>
                </div>
                <div className="ai-row">
                  <Sparkles size={16} style={{ flexShrink: 0, marginTop: 1 }} className="muted" />
                  <span><b>Resumo IA: </b>{DESTINATION.aiSummary}</span>
                </div>
                <span className="live-pill"><span className="live-dot" /> 4 alertas na rota · AO VIVO</span>
              </div>
            )}
          </div>
        </div>

        {/* Controles laterais direita: voz + camadas + centralizar */}
        <div style={{ position: 'absolute', right: 12, bottom: 130, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 20 }}>
          <button className="map-control" onClick={() => go('voice')} aria-label="Comando de voz"><Mic size={24} /></button>
          <button className="map-control" aria-label="Camadas de risco"><Layers size={24} /></button>
          <button className="map-control" aria-label="Centralizar"><Crosshair size={24} /></button>
        </div>

        {/* Barra de ações inferior: FAB "+" central + PÂNICO sempre visível (síntese) */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 22px 26px', zIndex: 20,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ width: 80 }} />

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
