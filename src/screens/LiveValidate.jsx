import { useState, useEffect, useRef } from 'react'
import { Droplets, ThumbsUp, ThumbsDown, Check, RotateCcw, Vibrate } from 'lucide-react'
import { useApp, buzz } from '../context/AppState.jsx'
import MapCanvas from '../components/MapCanvas.jsx'

/* Validação por crowdsourcing no estilo Waze: o usuário JÁ PASSOU pelo ponto de alagamento.
   Um pop-up transitório surge no canto inferior esquerdo (com vibração), dá ~6s para
   responder e some sozinho se ignorado. Não bloqueia o mapa nem força resposta.
   Sem tela de "obrigado" — apenas um micro-confirmação que também some. */
const SECONDS = 6

export default function LiveValidate() {
  const [phase, setPhase] = useState('asking') // asking | leaving | confirm | gone
  const timers = useRef([])

  function clearTimers() { timers.current.forEach(clearTimeout); timers.current = [] }

  function start() {
    clearTimers()
    setPhase('asking')
    buzz([120, 80, 120]) // vibra ao surgir
    // auto-dismiss se ninguém responder
    timers.current.push(setTimeout(() => setPhase('leaving'), SECONDS * 1000))
    timers.current.push(setTimeout(() => setPhase('gone'), SECONDS * 1000 + 350))
  }

  useEffect(() => { start(); return clearTimers }, [])

  function answer() {
    clearTimers()
    buzz(60)
    setPhase('confirm')
    timers.current.push(setTimeout(() => setPhase('gone'), 1500))
  }

  return (
    <div className="screen">
      <div className="screen-body">
        {/* Usuário já passou do alagamento (que fica atrás, em y=540) */}
        <MapCanvas userAt={{ x: 70, y: 470 }} />
        <div className="map-scrim" />

        {/* Pop-up transitório (canto inferior esquerdo) */}
        {(phase === 'asking' || phase === 'leaving') && (
          <div className={`live-toast ${phase === 'leaving' ? 'out' : ''}`}>
            <div className="lt-body">
              <div className="lt-row">
                <span className="cat-ico" style={{ background: 'var(--warning)', width: 40, height: 40, flex: '0 0 40px' }}>
                  <Droplets size={22} color="#1b1300" />
                </span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1.15 }}>Ainda tem alagamento?</div>
                  <div className="haptic" style={{ fontSize: 12 }}><Vibrate size={13} /> você passou por aqui</div>
                </div>
              </div>
              <div className="lt-actions">
                <button className="lt-btn yes" onClick={answer}><ThumbsUp size={18} /> Sim</button>
                <button className="lt-btn no" onClick={answer}><ThumbsDown size={18} /> Não</button>
              </div>
            </div>
            {phase === 'asking' && (
              <div className="live-countdown"><i style={{ animationDuration: `${SECONDS}s` }} /></div>
            )}
          </div>
        )}

        {/* Micro-confirmação (sem tela de "obrigado") */}
        {phase === 'confirm' && (
          <div className="live-confirm"><Check size={20} color="var(--safe)" /> Valeu!</div>
        )}

        {/* Apenas para o demo: reexibir o pop-up */}
        {phase === 'gone' && (
          <button className="map-control" style={{ position: 'absolute', left: 14, bottom: 120, width: 'auto', padding: '0 16px', gap: 8 }}
            onClick={start}>
            <RotateCcw size={20} /> <span style={{ fontWeight: 700 }}>Repetir alerta</span>
          </button>
        )}
      </div>
    </div>
  )
}
