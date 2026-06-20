import { useState } from 'react'
import { Flame, Vibrate, Eye, Volume2, History, User, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppState.jsx'
import { TopBar } from '../components/ui.jsx'

/* Menu lateral — configurações e acessibilidade (acesso menos frequente).
   Mantém a tela principal limpa. */
function Setting({ icon: Icon, label, desc, value, onToggle }) {
  return (
    <div className="setting-row">
      <div className="row gap-12">
        <Icon size={24} className="muted" />
        <div><div style={{ fontWeight: 700 }}>{label}</div><div className="muted" style={{ fontSize: 13 }}>{desc}</div></div>
      </div>
      <button className={`toggle ${value ? 'on' : ''}`} onClick={onToggle} aria-label={label} aria-pressed={value}>
        <span className="knob" />
      </button>
    </div>
  )
}

export default function SideMenu() {
  const { go } = useApp()
  const [heat, setHeat] = useState(true)
  const [vib, setVib] = useState(true)
  const [flash, setFlash] = useState(true)
  const [sound, setSound] = useState(false)

  return (
    <div className="screen">
      <TopBar title="Menu" />
      <div className="screen-body" style={{ padding: 16, overflowY: 'auto' }}>
        <div className="list-row" style={{ marginBottom: 16 }}>
          <span className="cat-ico" style={{ background: 'var(--info)', width: 48, height: 48 }}><User size={24} color="#fff" /></span>
          <div className="grow"><b style={{ fontSize: 18 }}>Lucas A.</b><div className="muted" style={{ fontSize: 14 }}>Motoboy · Campinas · acessibilidade auditiva</div></div>
        </div>

        <div className="muted" style={{ fontSize: 13, fontWeight: 700, margin: '4px 0 10px' }}>MAPA</div>
        <div className="stack gap-12">
          <Setting icon={Flame} label="Mapa de calor de risco" desc="Destaca zonas com mais ocorrências" value={heat} onToggle={() => setHeat(!heat)} />
          <button className="setting-row" onClick={() => go('history')}>
            <div className="row gap-12"><History size={24} className="muted" /><div style={{ fontWeight: 700 }}>Histórico por local</div></div>
            <ChevronRight className="muted" />
          </button>
        </div>

        <div className="muted" style={{ fontSize: 13, fontWeight: 700, margin: '18px 0 10px' }}>ACESSIBILIDADE</div>
        <div className="stack gap-12">
          <Setting icon={Vibrate} label="Alertas por vibração" desc="Padrões diferentes por tipo de risco" value={vib} onToggle={() => setVib(!vib)} />
          <Setting icon={Eye} label="Bordas piscantes" desc="Alerta visual sem depender de som" value={flash} onToggle={() => setFlash(!flash)} />
          <Setting icon={Volume2} label="Alertas sonoros" desc="Pode desligar (perfil surdo)" value={sound} onToggle={() => setSound(!sound)} />
        </div>
      </div>
    </div>
  )
}
