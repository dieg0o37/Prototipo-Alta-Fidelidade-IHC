import { useState, useEffect } from 'react'
import { Mic, Check, X } from 'lucide-react'
import { useApp, buzz } from '../context/AppState.jsx'
import { TopBar, BigButton } from '../components/ui.jsx'

/* Comando de voz (mãos no guidão). Reconhecimento roteirizado para o demo;
   em produção usaria Web Speech API. */
const SCRIPT = 'Buraco grande na pista, lado direito, perto do número 240.'

export default function Voice() {
  const { go, setLastReport } = useApp()
  const [phase, setPhase] = useState('listening') // listening | recognized
  const [text, setText] = useState('')

  useEffect(() => {
    if (phase !== 'listening') return
    let i = 0
    const t = setInterval(() => {
      i += 2
      setText(SCRIPT.slice(0, i))
      if (i >= SCRIPT.length) { clearInterval(t); setPhase('recognized'); buzz(60) }
    }, 45)
    return () => clearInterval(t)
  }, [phase])

  function confirm() {
    setLastReport({ label: 'Buraco na via', color: 'var(--warning)' })
    buzz(80)
    go('reportDone')
  }

  return (
    <div className="screen">
      <TopBar title="Comando de voz" />
      <div className="screen-body col-center" style={{ padding: 26, gap: 22 }}>
        <div className="col-center" style={{
          width: 150, height: 150, borderRadius: '50%',
          background: phase === 'listening' ? 'var(--info)' : 'var(--safe)',
          boxShadow: '0 0 0 12px rgba(37,99,235,.15)', transition: 'background .3s',
        }}>
          <Mic size={60} color="#fff" />
        </div>

        {phase === 'listening' && (
          <div className="voice-waves"><span /><span /><span /><span /><span /></div>
        )}

        <div className="card full" style={{ minHeight: 96 }}>
          <div className="muted" style={{ fontSize: 13, marginBottom: 6 }}>
            {phase === 'listening' ? 'Ouvindo… fale o perigo' : 'Reconhecido:'}
          </div>
          <div style={{ fontSize: 19, fontWeight: 600 }}>{text || '…'}</div>
        </div>

        {phase === 'recognized' && (
          <div className="full stack gap-12">
            <BigButton variant="safe" icon={Check} onClick={confirm}>Confirmar e enviar</BigButton>
            <BigButton variant="outline" icon={X} onClick={() => { setText(''); setPhase('listening') }}>Repetir</BigButton>
          </div>
        )}
      </div>
    </div>
  )
}
