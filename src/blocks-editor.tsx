import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Duration } from './duration'

type Block = {
  id: string
  pace: 'walk' | 'run'
  duration: Duration
}

export interface BlocksEditorProps {
  walkMinKm: string
  runMinKm: string
}

export const BlocksEditor = (props: BlocksEditorProps) => {
  const { walkMinKm, runMinKm } = props

  const [blocks, setBlocks] = useState<Block[]>([])

  const [walkMin, walkS] = walkMinKm ? walkMinKm.split(':') : ['0', '0']
  const [runMin, runS] = runMinKm ? runMinKm.split(':') : ['0', '0']
  const walkDuration = new Duration({
    minutes: parseInt(walkMin),
    seconds: parseInt(walkS),
  })
  const runDuration = new Duration({
    minutes: parseInt(runMin),
    seconds: parseInt(runS),
  })

  const totalTime = new Duration({}).add(blocks.map((block) => block.duration))

  const addBlock = (pace: 'walk' | 'run') => {
    setBlocks((blocks) => [
      ...blocks,
      {
        id: uuidv4(),
        pace,
        duration: pace === 'walk' ? walkDuration : runDuration,
      },
    ])
  }

  const removeBlock = (id: string) => {
    setBlocks((blocks) => blocks.filter((block) => block.id !== id))
  }

  return (
    <div className="mt-10 bg-emerald-600 w-fit rounded p-3">
      <div className="flex gap-3 items-center">
        <h2>Chód</h2>
        <button
          onClick={() => addBlock('walk')}
          className="py-1 px-4 rounded bg-emerald-700 hover:bg-emerald-800"
        >
          +
        </button>

        <h2>Bieg</h2>
        <button
          onClick={() => addBlock('run')}
          className="py-1 px-4 rounded bg-emerald-700 hover:bg-emerald-800"
        >
          +
        </button>

        <button
          onClick={() => setBlocks([])}
          className="py-1 px-4 rounded bg-emerald-700 hover:bg-emerald-800"
        >
          Reset
        </button>
      </div>

      <span>Czas: {totalTime.toString()}</span>

      <div className="flex gap-2">
        {blocks.map((block) => (
          <div
            onClick={() => removeBlock(block.id)}
            className={`p-2 rounded hover:cursor-pointer select-none ${
              block.pace === 'walk'
                ? 'bg-sky-700 hover:bg-sky-800'
                : 'bg-rose-300 hover:bg-rose-400'
            }`}
          >
            {block.pace === 'walk' ? 'chód' : 'bieg'}
          </div>
        ))}
      </div>
    </div>
  )
}
