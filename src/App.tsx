import { useState } from 'react'

import { TimeCalculator } from './time-calculator'
import { BlocksEditor } from './blocks-editor'

export default function App() {
  const [walkKmH, setWalkKmH] = useState(0)
  const [walkMinKm, setWalkMinKm] = useState('')
  const [runKmH, setRunKmH] = useState(0)
  const [runMinKm, setRunMinKm] = useState('')

  return (
    <div className="bg-emerald-500 h-screen p-10">
      <TimeCalculator
        walkKmH={walkKmH}
        setWalkKmH={setWalkKmH}
        walkMinKm={walkMinKm}
        setWalkMinKm={setWalkMinKm}
        runKmH={runKmH}
        setRunKmH={setRunKmH}
        runMinKm={runMinKm}
        setRunMinKm={setRunMinKm}
      />

      <BlocksEditor walkMinKm={walkMinKm} runMinKm={runMinKm} />
    </div>
  )
}
