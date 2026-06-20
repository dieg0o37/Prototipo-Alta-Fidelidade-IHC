import { useState } from 'react'
import { Send } from 'lucide-react'
import { useApp, buzz } from '../context/AppState.jsx'
import { TopBar } from '../components/ui.jsx'

/* Chat de emergência pré-configurado — para usuários surdos / com deficiência
   de fala se comunicarem sem depender de áudio. Mensagens-preset = 1 toque. */
const PRESETS = [
  'Preciso de ajuda agora',
  'Sofri um acidente',
  'Estou sendo ameaçado',
  'Pane na moto',
  'Compartilhar minha localização',
]

export default function EmergencyChat() {
  const [msgs, setMsgs] = useState([
    { who: 'them', text: 'Central de Emergência. Recebemos sua localização. Qual a situação?' },
  ])

  function send(text) {
    buzz(40)
    setMsgs((m) => [...m, { who: 'me', text }])
    setTimeout(() => setMsgs((m) => [...m, { who: 'them', text: 'Entendido. Apoio a caminho. Permaneça onde está se for seguro.' }]), 900)
  }

  return (
    <div className="screen">
      <TopBar title="Chat de emergência" />
      <div className="screen-body" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="chat-list grow" style={{ overflowY: 'auto' }}>
          {msgs.map((m, i) => (
            <div key={i} className={`bubble ${m.who}`}>{m.text}</div>
          ))}
        </div>
        <div className="preset-row">
          {PRESETS.map((p) => (
            <button key={p} className="preset-chip" onClick={() => send(p)}>{p}</button>
          ))}
          <button className="big-btn info" style={{ minHeight: 52 }} onClick={() => send('Mensagem enviada')}>
            <Send size={20} /> Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
