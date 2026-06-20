import { Signal, Wifi, BatteryFull } from 'lucide-react'

/* Moldura de celular para screenshots realistas no relatório. */
export default function PhoneFrame({ theme, children }) {
  return (
    <div className="phone-frame">
      <div className="phone-notch" />
      <div className="phone-screen" data-theme={theme}>
        <StatusBar />
        <div className="grow" style={{ position: 'relative' }}>{children}</div>
      </div>
    </div>
  )
}

function StatusBar() {
  return (
    <div className="statusbar">
      <span>20:14</span>
      <span className="icons"><Signal size={15} /><Wifi size={15} /><BatteryFull size={17} /></span>
    </div>
  )
}
