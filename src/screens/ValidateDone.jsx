import { Users, Home } from 'lucide-react'
import { useApp } from '../context/AppState.jsx'
import { BigButton } from '../components/ui.jsx'

export default function ValidateDone() {
  const { go } = useApp()
  return (
    <div className="screen">
      <div className="screen-body col-center" style={{ padding: 28, gap: 18 }}>
        <Users size={92} color="var(--safe)" />
        <h2 style={{ fontSize: 'var(--fs-xl)' }}>Obrigado!</h2>
        <p className="muted" style={{ fontSize: 18, textAlign: 'center' }}>
          Sua resposta mantém o mapa confiável para toda a rede de motoboys.
        </p>
        <div className="full stack gap-12" style={{ marginTop: 12 }}>
          <BigButton variant="info" icon={Home} onClick={() => go('home')}>Voltar ao mapa</BigButton>
        </div>
      </div>
    </div>
  )
}
