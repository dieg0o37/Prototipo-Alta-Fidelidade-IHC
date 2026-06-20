import { useState } from 'react'
import { Flame, Vibrate, Eye, Volume2, History, User, ChevronRight, Clock, Utensils, BedDouble } from 'lucide-react'
import { useApp } from '../context/AppState.jsx'
import { TopBar, ThemeSwitch } from '../components/ui.jsx'
import { STATS } from '../data.js'

/* Menu lateral — perfil/estatísticas, integrações, configurações e acessibilidade.
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

function Stat({ num, lbl }) {
  return <div className="stat"><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
}

export default function SideMenu() {
  const { go, ifoodConnected, setIfoodConnected } = useApp()
  const [heat, setHeat] = useState(true)
  const [vib, setVib] = useState(true)
  const [flash, setFlash] = useState(true)
  const [sound, setSound] = useState(false)

  const pct = Math.min(100, Math.round((STATS.hoursToday / STATS.healthyHours) * 100))
  const warn = STATS.hoursToday >= STATS.healthyHours * 0.85

  return (
    <div className="screen">
      <TopBar title="Menu" />
      <div className="screen-body" style={{ padding: 16, overflowY: 'auto' }}>
        {/* Perfil */}
        <div className="list-row" style={{ marginBottom: 14 }}>
          <span className="cat-ico" style={{ background: 'var(--info)', width: 48, height: 48 }}><User size={24} color="#fff" /></span>
          <div className="grow"><b style={{ fontSize: 18 }}>Lucas A.</b><div className="muted" style={{ fontSize: 14 }}>Motoboy · Campinas · acessibilidade auditiva</div></div>
        </div>

        {/* Estatísticas de jornada */}
        <div className="muted" style={{ fontSize: 13, fontWeight: 700, margin: '4px 0 10px' }}>MINHA JORNADA</div>
        <div className="stats-grid" style={{ marginBottom: 12 }}>
          <Stat num={STATS.totalRides.toLocaleString('pt-BR')} lbl="corridas no total" />
          <Stat num={STATS.today} lbl="entregas hoje" />
        </div>
        <div className="jornada" style={{ marginBottom: 6 }}>
          <div className="row between">
            <span className="row gap-8" style={{ fontWeight: 700 }}><Clock size={18} /> Controle de jornada</span>
            <span className="muted" style={{ fontSize: 13 }}>meta saudável {STATS.healthyHours}h</span>
          </div>
          <div className={`jornada-bar ${warn ? 'warn' : ''}`}><i style={{ width: `${pct}%` }} /></div>
          <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>
            {STATS.hoursLabel} trabalhadas hoje. {warn ? 'Considere uma pausa para evitar fadiga.' : 'Dentro de uma jornada saudável.'}
          </div>
          <button className="big-btn outline" style={{ minHeight: 48, marginTop: 12 }} onClick={() => go('rest')}>
            <BedDouble size={20} /> Ver aviso de descanso
          </button>
        </div>

        {/* Integrações */}
        <div className="muted" style={{ fontSize: 13, fontWeight: 700, margin: '18px 0 10px' }}>INTEGRAÇÕES</div>
        <div className="stack gap-12">
          <Setting icon={Utensils} label="Conectar conta iFood" desc="Ao aceitar uma corrida, a rota entra no mapa já com os alertas de segurança."
            value={ifoodConnected} onToggle={() => setIfoodConnected(!ifoodConnected)} />
        </div>

        {/* Mapa */}
        <div className="muted" style={{ fontSize: 13, fontWeight: 700, margin: '18px 0 10px' }}>MAPA</div>
        <div className="stack gap-12">
          <Setting icon={Flame} label="Mapa de calor de risco" desc="Destaca zonas com mais ocorrências" value={heat} onToggle={() => setHeat(!heat)} />
          <button className="setting-row" onClick={() => go('history')}>
            <div className="row gap-12"><History size={24} className="muted" /><div style={{ fontWeight: 700 }}>Histórico por local</div></div>
            <ChevronRight className="muted" />
          </button>
        </div>

        {/* Aparência */}
        <div className="muted" style={{ fontSize: 13, fontWeight: 700, margin: '18px 0 10px' }}>APARÊNCIA</div>
        <div className="setting-row">
          <div className="row gap-12">
            <Eye size={24} className="muted" />
            <div><div style={{ fontWeight: 700 }}>Tema</div><div className="muted" style={{ fontSize: 13 }}>Dia (sol) · Noite (turnos)</div></div>
          </div>
          <ThemeSwitch />
        </div>

        {/* Acessibilidade */}
        <div className="muted" style={{ fontSize: 13, fontWeight: 700, margin: '18px 0 10px' }}>ACESSIBILIDADE</div>
        <div className="stack gap-12" style={{ paddingBottom: 8 }}>
          <Setting icon={Vibrate} label="Alertas por vibração" desc="Padrões diferentes por tipo de risco" value={vib} onToggle={() => setVib(!vib)} />
          <Setting icon={Eye} label="Bordas piscantes" desc="Alerta visual sem depender de som" value={flash} onToggle={() => setFlash(!flash)} />
          <Setting icon={Volume2} label="Alertas sonoros" desc="Pode desligar (perfil surdo)" value={sound} onToggle={() => setSound(!sound)} />
        </div>
      </div>
    </div>
  )
}
