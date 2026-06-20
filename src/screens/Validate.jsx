import { Droplets, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useApp, buzz } from '../context/AppState.jsx'
import { BigButton, HapticIndicator } from '../components/ui.jsx'

/* Validação por crowdsourcing — confirmação com 1 toque (restrição Pragmática).
   Pergunta simplificada ao passar por um ponto já relatado. */
export default function Validate() {
  const { go } = useApp()
  function answer() { buzz(60); go('validateDone') }
  return (
    <div className="screen">
      <div className="screen-body col-center" style={{ padding: 24, gap: 20 }}>
        <span className="cat-ico" style={{ background: 'var(--warning)', width: 76, height: 76 }}>
          <Droplets size={42} color="#1b1300" />
        </span>
        <h2 style={{ fontSize: 'var(--fs-xl)', textAlign: 'center' }}>Ainda tem alagamento aqui?</h2>
        <p className="muted" style={{ textAlign: 'center', fontSize: 17 }}>
          Relatado há 35 min · Av. Albino J. B. de Oliveira
        </p>
        <HapticIndicator label="Toque uma vez para responder" />

        <div className="full stack gap-12" style={{ marginTop: 8 }}>
          <BigButton variant="safe" icon={ThumbsUp} onClick={answer}>Sim, continua</BigButton>
          <BigButton variant="danger" icon={ThumbsDown} onClick={answer}>Não, já passou</BigButton>
        </div>
      </div>
    </div>
  )
}
