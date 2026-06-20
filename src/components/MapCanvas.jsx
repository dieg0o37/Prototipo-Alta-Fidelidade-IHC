import { AlertTriangle, Droplets, ShieldAlert, UserX, Navigation } from 'lucide-react'

/* Mapa estilizado (sem API real). Ruas em SVG + zonas de calor + marcadores.
   `rerouted` mostra a rota alternativa desviando do ponto de risco.
   `markers` permite destacar/ocultar pinos. */
export default function MapCanvas({ rerouted = false, showHeat = true }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--map-bg)' }}>
      <svg viewBox="0 0 390 760" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        {/* Quarteirões */}
        <g fill="var(--surface-2)" opacity="0.5">
          <rect x="20" y="40" width="120" height="120" rx="8" />
          <rect x="160" y="40" width="100" height="160" rx="8" />
          <rect x="280" y="40" width="90" height="120" rx="8" />
          <rect x="20" y="200" width="120" height="160" rx="8" />
          <rect x="280" y="200" width="90" height="180" rx="8" />
          <rect x="20" y="420" width="100" height="160" rx="8" />
          <rect x="160" y="260" width="100" height="160" rx="8" />
          <rect x="160" y="480" width="120" height="140" rx="8" />
          <rect x="300" y="440" width="70" height="180" rx="8" />
          <rect x="20" y="620" width="140" height="120" rx="8" />
          <rect x="300" y="640" width="70" height="100" rx="8" />
        </g>

        {/* Avenidas */}
        <g stroke="var(--map-road)" strokeWidth="16" strokeLinecap="round" fill="none">
          <path d="M0 180 H390" />
          <path d="M0 400 H390" />
          <path d="M0 620 H390" />
          <path d="M150 0 V760" />
          <path d="M275 0 V760" />
        </g>
        <g stroke="var(--map-road-2)" strokeWidth="9" strokeLinecap="round" fill="none">
          <path d="M70 0 V760" />
        </g>

        {/* Zonas de calor (risco acumulado pela comunidade) */}
        {showHeat && (
          <g>
            <circle cx="150" cy="180" r="70" fill="var(--danger)" opacity="0.22" />
            <circle cx="150" cy="180" r="42" fill="var(--danger)" opacity="0.22" />
            <circle cx="300" cy="400" r="62" fill="var(--warning)" opacity="0.22" />
            <circle cx="90" cy="600" r="55" fill="var(--warning)" opacity="0.2" />
          </g>
        )}

        {/* Rota planejada (posição do usuário -> destino) */}
        {!rerouted ? (
          <path d="M70 720 L70 400 L150 400 L150 180 L275 180 L275 60"
            stroke="var(--info)" strokeWidth="8" fill="none"
            strokeLinecap="round" strokeDasharray="2 14" opacity="0.95" />
        ) : (
          <path d="M70 720 L70 400 L275 400 L275 60"
            stroke="var(--safe)" strokeWidth="8" fill="none"
            strokeLinecap="round" strokeDasharray="2 14" opacity="0.95" />
        )}
      </svg>

      {/* Posição do usuário */}
      <Pin x={70} y={720} color="var(--info)"><Navigation size={20} fill="#fff" color="#fff" /></Pin>

      {/* Marcadores de risco da comunidade */}
      <Pin x={150} y={180} color="var(--danger)" pulse={!rerouted}><ShieldAlert size={20} color="#fff" /></Pin>
      <Pin x={300} y={400} color="var(--warning)" dark><AlertTriangle size={20} color="#1b1300" /></Pin>
      <Pin x={90} y={600} color="var(--warning)" dark><Droplets size={20} color="#1b1300" /></Pin>
      <Pin x={245} y={290} color="var(--danger)"><UserX size={20} color="#fff" /></Pin>
    </div>
  )
}

function Pin({ x, y, color, children, pulse, dark }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)',
      width: 40, height: 40, borderRadius: '50% 50% 50% 0',
      background: color, rotate: '45deg',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 10px rgba(0,0,0,.35)',
      outline: pulse ? `0 solid ${color}` : 'none',
      animation: pulse ? 'panic-breathe 1.4s ease-in-out infinite' : 'none',
    }}>
      <div style={{ rotate: '-45deg', display: 'flex' }}>{children}</div>
    </div>
  )
}
