import { AlertTriangle, Droplets, ShieldAlert, UserX, Navigation, Flag } from 'lucide-react'

/* Mapa estilizado (sem API real). Tudo — ruas, zonas de calor e marcadores — é desenhado
   DENTRO do mesmo SVG (viewBox 390×760), garantindo que os pinos fiquem exatamente sobre as
   ruas em qualquer tamanho de tela. `rerouted` mostra a rota alternativa; `userAt` permite
   reposicionar a posição do usuário (usado na validação Waze, já tendo passado do ponto). */

const PIN = 'M0,0 C-9,-13 -16,-19 -16,-30 A16,16 0 1 1 16,-30 C16,-19 9,-13 0,0 Z'

function Marker({ x, y, color, dark, pulse, icon: Icon }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {pulse && <circle cx="0" cy="-30" r="17" fill={color} className="pin-ping" />}
      <path d={PIN} fill={color} stroke="rgba(0,0,0,.25)" strokeWidth="1" />
      <foreignObject x="-12" y="-42" width="24" height="24">
        <div xmlns="http://www.w3.org/1999/xhtml"
          style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={dark ? '#1b1300' : '#fff'} />
        </div>
      </foreignObject>
    </g>
  )
}

function UserDot({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx="0" cy="0" r="16" fill="var(--info)" opacity="0.25" />
      <circle cx="0" cy="0" r="11" fill="var(--info)" stroke="#fff" strokeWidth="3" />
      <foreignObject x="-9" y="-9" width="18" height="18">
        <div xmlns="http://www.w3.org/1999/xhtml"
          style={{ width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Navigation size={13} color="#fff" fill="#fff" />
        </div>
      </foreignObject>
    </g>
  )
}

export default function MapCanvas({ rerouted = false, showHeat = true, userAt = { x: 70, y: 690 } }) {
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

        {/* Avenidas (horizontais y=180/400/620; verticais x=150/275; via secundária x=70) */}
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

        {/* Zonas de calor (centradas nos respectivos marcadores) */}
        {showHeat && (
          <g>
            <circle cx="150" cy="180" r="70" fill="var(--danger)" opacity="0.22" />
            <circle cx="150" cy="180" r="42" fill="var(--danger)" opacity="0.22" />
            <circle cx="275" cy="400" r="60" fill="var(--warning)" opacity="0.22" />
            <circle cx="70" cy="540" r="55" fill="var(--warning)" opacity="0.2" />
          </g>
        )}

        {/* Rota planejada (usuário -> destino) */}
        {!rerouted ? (
          <path d="M70 690 L70 400 L150 400 L150 180 L275 180 L275 80"
            stroke="var(--info)" strokeWidth="8" fill="none"
            strokeLinecap="round" strokeDasharray="2 14" opacity="0.95" />
        ) : (
          <path d="M70 690 L70 400 L275 400 L275 80"
            stroke="var(--safe)" strokeWidth="8" fill="none"
            strokeLinecap="round" strokeDasharray="2 14" opacity="0.95" />
        )}

        {/* Marcadores (sobre as ruas) */}
        <Marker x={275} y={80} color="var(--safe)" icon={Flag} />
        <Marker x={150} y={180} color="var(--danger)" pulse={!rerouted} icon={ShieldAlert} />
        <Marker x={275} y={400} color="var(--warning)" dark icon={AlertTriangle} />
        <Marker x={70} y={540} color="var(--warning)" dark icon={Droplets} />
        <Marker x={275} y={290} color="var(--danger)" icon={UserX} />

        {/* Posição do usuário */}
        <UserDot x={userAt.x} y={userAt.y} />
      </svg>
    </div>
  )
}
