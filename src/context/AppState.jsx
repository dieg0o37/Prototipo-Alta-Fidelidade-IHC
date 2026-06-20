import { createContext, useContext, useState, useCallback } from 'react'

const AppCtx = createContext(null)
export const useApp = () => useContext(AppCtx)

/* Dispara vibração real quando o dispositivo suportar (mobile);
   no desktop o feedback é apenas visual (HapticIndicator). */
export function buzz(pattern) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern)
  } catch { /* ignora */ }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dia')        // 'dia' | 'noite'
  const [screen, setScreen] = useState('home')     // tela atual
  const [history, setHistory] = useState([])       // pilha para voltar
  const [sheetOpen, setSheetOpen] = useState(false)

  // Estado da jornada / demo
  const [lastReport, setLastReport] = useState(null)
  const [routeRerouted, setRouteRerouted] = useState(false)
  const [panicActive, setPanicActive] = useState(false)
  const [ifoodConnected, setIfoodConnected] = useState(true) // integração ativa no demo

  const go = useCallback((next) => {
    setSheetOpen(false)
    setScreen((cur) => {
      setHistory((h) => [...h, cur])
      return next
    })
  }, [])

  const back = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h
      const prev = h[h.length - 1]
      setScreen(prev)
      return h.slice(0, -1)
    })
  }, [])

  const value = {
    theme, setTheme,
    screen, go, back,
    sheetOpen, setSheetOpen,
    lastReport, setLastReport,
    routeRerouted, setRouteRerouted,
    panicActive, setPanicActive,
    ifoodConnected, setIfoodConnected,
  }
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}
