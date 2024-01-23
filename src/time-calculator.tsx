import { Dispatch, SetStateAction } from 'react'

import { Duration } from './duration'

export interface TimeCalculatorProps {
  walkKmH: number
  setWalkKmH: Dispatch<SetStateAction<number>>
  walkMinKm: string
  setWalkMinKm: Dispatch<SetStateAction<string>>
  runKmH: number
  setRunKmH: Dispatch<SetStateAction<number>>
  runMinKm: string
  setRunMinKm: Dispatch<SetStateAction<string>>
}

export const TimeCalculator = (props: TimeCalculatorProps) => {
  const {
    walkKmH,
    setWalkKmH,
    walkMinKm,
    setWalkMinKm,
    runKmH,
    setRunKmH,
    runMinKm,
    setRunMinKm,
  } = props

  const [walkMin, walkS] = walkMinKm ? walkMinKm.split(':') : ['0', '0']
  const [runMin, runS] = runMinKm ? runMinKm.split(':') : ['0', '0']
  const walkDuration = new Duration({
    minutes: parseInt(walkMin),
    seconds: parseInt(walkS),
  })
  const runDuration = new Duration({
    minutes: 2 * parseInt(runMin),
    seconds: 2 * parseInt(runS),
  })
  const totalTimePack = walkDuration.add([runDuration])

  const totalTimeHalfMarathon = new Duration({}).add(
    Array(7).fill(totalTimePack),
  )

  const handleConvertionSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      walkKmH: { value: string }
      runKmH: { value: string }
    }

    const parsedWalkKmH = target.walkKmH.value.replace(',', '.')
    const walkKmH = Number(parsedWalkKmH)
    setWalkKmH(walkKmH)
    setWalkMinKm(convertToMinKm(walkKmH))

    const parsedRunKmH = target.runKmH.value.replace(',', '.')
    const runKmH = Number(parsedRunKmH)
    setRunKmH(runKmH)
    setRunMinKm(convertToMinKm(runKmH))
  }

  return (
    <div className="bg-emerald-600 p-3 rounded w-fit">
      <form onSubmit={handleConvertionSubmit} className="flex gap-4">
        <div className="bg-emerald-700 p-4 rounded w-fit">
          <h1 className="font-bold pb-3">Chód</h1>
          <div className="flex flex-col gap-2">
            <label>
              km/h <input type="text" name="walkKmH" />
            </label>
            <span>
              {walkKmH} km/h = {walkMinKm} min/km
            </span>
          </div>
        </div>

        <div className="p-4 rounded w-fit bg-emerald-700">
          <h1 className="font-bold pb-3">Bieg</h1>
          <div className="flex flex-col gap-2">
            <label>
              km/h <input type="text" name="runKmH" />
            </label>
            <span>
              {runKmH} km/h = {runMinKm} min/km
            </span>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>

      <div className="flex flex-col gap-2">
        <span>Paczka (ch,b,b) = {totalTimePack.toString()}</span>
        <span>Półmaraton = {totalTimeHalfMarathon.toString()}</span>
      </div>
    </div>
  )
}

const convertToMinKm = (kmH: number): string => {
  const minKm = 60 / kmH
  const seconds = (minKm % 1) * 60

  return `${Math.floor(minKm)}:${Math.floor(seconds)}`
}
