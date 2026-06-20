import { useState, useEffect } from 'react'
import { VolumeX, Phone, Users, ShieldCheck, X, Check } from 'lucide-react'
import { useApp, buzz } from '../context/AppState.jsx'
import { BigButton, HapticIndicator } from '../components/ui.jsx'

/* Botão de pânico SILENCIOSO — não emite som no local; alerta a rede de apoio
   e autoridades. Contagem regressiva evita falsos disparos. */
export default function Panic() {
  const { go } = useApp()
  const [phase, setPhase] = useState('arming') // arming | sent
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (phase !== 'arming') return
    if (count === 0) { setPhase('sent'); buzz([300, 150, 300]); return }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, count])

  if (phase === 'arming') {
    return (
      <div className="screen">
        <div className="screen-body col-center" style={{ padding: 26, gap: 22, background: 'var(--danger-strong)' }}>
          <div className="row gap-8" style={{ color: '#fff', opacity: 0.9 }}>
            <VolumeX size={20} /> <span style={{ fontWeight: 700 }}>Alerta silencioso</span>
          </div>
          <div className="col-center" style={{
            width: 180, height: 180, borderRadius: '50%',
            background: 'rgba(255,255,255,.15)', color: '#fff',
            fontSize: 90, fontWeight: 800,
          }}>{count}</div>
          <p style={{ color: '#fff', fontSize: 19, textAlign: 'center', fontWeight: 600 }}>
            Enviando à sua rede de apoio…
          </p>
          <button className="big-btn" style={{ background: '#fff', color: 'var(--danger-strong)' }} onClick={() => go('home')}>
            <X size={24} /> Cancelar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="screen-body" style={{ padding: 22, overflowY: 'auto' }}>
        <div className="col-center" style={{ gap: 12, marginBottom: 18 }}>
          <ShieldCheck size={80} color="var(--safe)" />
          <h2 style={{ fontSize: 'var(--fs-xl)' }}>Ajuda a caminho</h2>
          <HapticIndicator label="Confirmado por vibração (sem som)" />
        </div>

        <div className="stack gap-12">
          <div className="list-row"><span className="dot" style={{ background: 'var(--safe)' }} />
            <Users size={22} /><div className="grow"><b>3 motoboys próximos</b><div className="muted" style={{ fontSize: 14 }}>notificados · 400 m</div></div><Check color="var(--safe)" /></div>
          <div className="list-row"><span className="dot" style={{ background: 'var(--safe)' }} />
            <Phone size={22} /><div className="grow"><b>Contato de emergência</b><div className="muted" style={{ fontSize: 14 }}>localização enviada</div></div><Check color="var(--safe)" /></div>
          <div className="list-row"><span className="dot" style={{ background: 'var(--warning)' }} />
            <ShieldCheck size={22} /><div className="grow"><b>Central 190</b><div className="muted" style={{ fontSize: 14 }}>chamando…</div></div></div>
        </div>

        <div className="stack gap-12" style={{ marginTop: 18 }}>
          <BigButton variant="info" icon={Phone} onClick={() => go('chat')}>Abrir chat de emergência</BigButton>
          <BigButton variant="outline" onClick={() => go('home')}>Estou seguro — encerrar</BigButton>
        </div>
      </div>
    </div>
  )
}
