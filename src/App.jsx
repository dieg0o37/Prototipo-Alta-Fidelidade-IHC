import { useApp } from './context/AppState.jsx'
import PhoneFrame from './components/PhoneFrame.jsx'
import QuickSheet from './screens/QuickSheet.jsx'

import HomeMap from './screens/HomeMap.jsx'
import Report from './screens/Report.jsx'
import ReportDone from './screens/ReportDone.jsx'
import Voice from './screens/Voice.jsx'
import ProximityAlert from './screens/ProximityAlert.jsx'
import AltRoute from './screens/AltRoute.jsx'
import Validate from './screens/Validate.jsx'
import ValidateDone from './screens/ValidateDone.jsx'
import Panic from './screens/Panic.jsx'
import EmergencyChat from './screens/EmergencyChat.jsx'
import SideMenu from './screens/SideMenu.jsx'
import History from './screens/History.jsx'

const SCREENS = {
  home: HomeMap,
  report: Report,
  reportDone: ReportDone,
  voice: Voice,
  alert: ProximityAlert,
  altRoute: AltRoute,
  validate: Validate,
  validateDone: ValidateDone,
  panic: Panic,
  chat: EmergencyChat,
  menu: SideMenu,
  history: History,
}

/* Dock fora do celular — só para navegar o protótipo / capturar telas.
   Não faz parte da UI do app. */
const DOCK = [
  ['home', 'Mapa'],
  ['alert', 'Alerta de risco'],
  ['altRoute', 'Rota segura'],
  ['validate', 'Validação'],
  ['report', 'Denúncia'],
  ['voice', 'Voz'],
  ['panic', 'Pânico'],
  ['chat', 'Chat SOS'],
  ['menu', 'Menu'],
  ['history', 'Histórico'],
]

export default function App() {
  const { theme, screen, go } = useApp()
  const Current = SCREENS[screen] || HomeMap
  return (
    <div className="stage">
      <PhoneFrame theme={theme}>
        <Current />
        <QuickSheet />
      </PhoneFrame>

      <div className="app-caption">
        <b>Alerta Motoboy</b> — Protótipo de alta fidelidade · Fase 3 · Equipe 244 (MC750/Unicamp)
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 440 }}>
        {DOCK.map(([key, label]) => (
          <button key={key} onClick={() => go(key)}
            style={{
              padding: '8px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700,
              background: screen === key ? '#2563eb' : 'rgba(255,255,255,.10)',
              color: '#fff', border: '1px solid rgba(255,255,255,.18)',
            }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
