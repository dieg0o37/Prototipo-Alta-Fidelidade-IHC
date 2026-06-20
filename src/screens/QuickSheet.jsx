import { AlertOctagon, MessageSquareWarning, Mic, X } from 'lucide-react'
import { useApp } from '../context/AppState.jsx'
import { BigButton } from '../components/ui.jsx'

/* Ações rápidas do botão "+" (base Minimalista — funções em camada). */
export default function QuickSheet() {
  const { sheetOpen, setSheetOpen, go } = useApp()
  if (!sheetOpen) return null
  return (
    <div className="sheet-backdrop" onClick={() => setSheetOpen(false)}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="grabber" />
        <div className="row between" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: 'var(--fs-lg)' }}>Ações rápidas</h2>
          <button className="back" onClick={() => setSheetOpen(false)} aria-label="Fechar"><X size={24} /></button>
        </div>
        <div className="stack gap-12">
          <BigButton variant="danger" icon={AlertOctagon} onClick={() => go('report')}>
            Denunciar perigo na via
          </BigButton>
          <BigButton variant="info" icon={Mic} onClick={() => go('voice')}>
            Denunciar por voz
          </BigButton>
          <BigButton variant="secondary" icon={MessageSquareWarning} onClick={() => go('chat')}>
            Chat de emergência
          </BigButton>
        </div>
      </div>
    </div>
  )
}
