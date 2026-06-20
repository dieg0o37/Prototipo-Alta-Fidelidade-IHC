import { Sun, Moon, ChevronLeft, Vibrate } from 'lucide-react'
import { useApp } from '../context/AppState.jsx'

/* Botão grande genérico (hitbox >= 64px) */
export function BigButton({ variant = 'info', icon: Icon, children, ...rest }) {
  return (
    <button className={`big-btn ${variant}`} {...rest}>
      {Icon && <Icon size={24} />}
      <span>{children}</span>
    </button>
  )
}

/* Cabeçalho com voltar */
export function TopBar({ title }) {
  const { back } = useApp()
  return (
    <div className="topbar">
      <button className="back" onClick={back} aria-label="Voltar"><ChevronLeft size={26} /></button>
      <h1>{title}</h1>
    </div>
  )
}

/* Alternância de tema dia/noite */
export function ThemeSwitch() {
  const { theme, setTheme } = useApp()
  return (
    <div className="theme-switch" role="group" aria-label="Tema">
      <button className={theme === 'dia' ? 'active' : ''} onClick={() => setTheme('dia')} aria-label="Tema dia"><Sun size={22} /></button>
      <button className={theme === 'noite' ? 'active' : ''} onClick={() => setTheme('noite')} aria-label="Tema noite"><Moon size={22} /></button>
    </div>
  )
}

/* Indicador háptico visual (redundância para o feedback de vibração) */
export function HapticIndicator({ label = 'Vibrando' }) {
  return (
    <span className="haptic"><span className="wave" /><Vibrate size={16} /> {label}</span>
  )
}

/* Bordas piscantes — alerta visual redundante (acessibilidade auditiva) */
export function ScreenBorderAlert({ level = 'danger' }) {
  return <div className={`border-alert ${level}`} aria-hidden="true" />
}
