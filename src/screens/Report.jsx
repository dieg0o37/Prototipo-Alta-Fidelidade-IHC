import { useState } from 'react'
import { ShieldAlert, Droplets, AlertTriangle, UserX, Bike, Mic, Check } from 'lucide-react'
import { useApp, buzz } from '../context/AppState.jsx'
import { TopBar, BigButton } from '../components/ui.jsx'

const CATS = [
  { id: 'assalto', label: 'Assalto / Risco', icon: ShieldAlert, color: 'var(--danger)', dark: false },
  { id: 'buraco', label: 'Buraco na via', icon: AlertTriangle, color: 'var(--warning)', dark: true },
  { id: 'alagamento', label: 'Alagamento', icon: Droplets, color: 'var(--warning)', dark: true },
  { id: 'cliente', label: 'Cliente / Local hostil', icon: UserX, color: 'var(--danger)', dark: false },
  { id: 'acidente', label: 'Acidente', icon: Bike, color: 'var(--danger)', dark: false },
  { id: 'sinalizacao', label: 'Sem sinalização', icon: AlertTriangle, color: 'var(--warning)', dark: true },
]

export default function Report() {
  const { go, setLastReport } = useApp()
  const [sel, setSel] = useState(null)

  function confirm() {
    const cat = CATS.find((c) => c.id === sel)
    setLastReport(cat)
    buzz(80)
    go('reportDone')
  }

  return (
    <div className="screen">
      <TopBar title="Denunciar perigo" />
      <div className="screen-body" style={{ padding: 16, overflowY: 'auto' }}>
        <p className="muted" style={{ marginBottom: 14 }}>Toque no tipo de risco. Sua denúncia aparece no mapa de toda a comunidade.</p>
        <div className="cat-grid">
          {CATS.map((c) => {
            const Icon = c.icon
            return (
              <button key={c.id} className={`cat-btn ${sel === c.id ? 'selected' : ''}`} onClick={() => setSel(c.id)}>
                <span className="cat-ico" style={{ background: c.color }}>
                  <Icon size={28} color={c.dark ? '#1b1300' : '#fff'} />
                </span>
                {c.label}
              </button>
            )
          })}
        </div>

        <div className="stack gap-12" style={{ marginTop: 18 }}>
          <BigButton variant="info" icon={Mic} onClick={() => go('voice')}>Descrever por voz (sem tocar)</BigButton>
          <BigButton variant="safe" icon={Check} disabled={!sel} onClick={confirm}
            style={{ opacity: sel ? 1 : 0.5 }}>
            Enviar denúncia
          </BigButton>
        </div>
      </div>
    </div>
  )
}
