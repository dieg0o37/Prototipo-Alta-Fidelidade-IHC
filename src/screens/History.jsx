import { Building2, ShieldAlert, AlertTriangle, Droplets, Sparkles } from 'lucide-react'
import { TopBar } from '../components/ui.jsx'

/* Histórico de incidentes por local/condomínio + resumo gerado por IA
   (crowdsourcing condensado para o próximo entregador). */
const PLACES = [
  { name: 'Cond. Residencial Vila Verde', n: 12, level: 'var(--danger)', icon: ShieldAlert,
    ai: 'IA: portaria costuma atrasar liberação; relatos de tratamento hostil à noite.' },
  { name: 'Av. Albino J. B. de Oliveira', n: 8, level: 'var(--warning)', icon: Droplets,
    ai: 'IA: alaga em dias de chuva forte, trecho próximo ao número 240.' },
  { name: 'Rua das Hortênsias', n: 5, level: 'var(--warning)', icon: AlertTriangle,
    ai: 'IA: buracos e falta de iluminação; evite após as 21h.' },
]

export default function History() {
  return (
    <div className="screen">
      <TopBar title="Histórico por local" />
      <div className="screen-body" style={{ padding: 16, overflowY: 'auto' }}>
        {PLACES.map((p) => {
          const Icon = p.icon
          return (
            <div key={p.name} className="card" style={{ marginBottom: 14 }}>
              <div className="row gap-12" style={{ marginBottom: 8 }}>
                <span className="cat-ico" style={{ background: p.level, width: 46, height: 46 }}>
                  <Icon size={24} color={p.level === 'var(--warning)' ? '#1b1300' : '#fff'} />
                </span>
                <div className="grow">
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div className="muted row gap-8" style={{ fontSize: 13 }}><Building2 size={14} /> {p.n} ocorrências (90 dias)</div>
                </div>
              </div>
              <div className="row gap-8" style={{ background: 'var(--surface-2)', borderRadius: 12, padding: '10px 12px', fontSize: 14 }}>
                <Sparkles size={16} className="muted" /><span>{p.ai}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
