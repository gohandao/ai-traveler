import { useState } from 'react'

import { getEdgeAiStream } from '@/utils/getEdgeAiStream'

export const SampleEdgeAiRenponse = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [output, setOutput] = useState<string>('')
  const prompt = '例）東京都のおすすめ観光地は？'
  return (
    <div>
      <button
        onClick={e => {
          e.preventDefault()
          !loading && getEdgeAiStream({ prompt, setOutput, setLoading })
        }}
      >
        submit
      </button>
      <p>{output}</p>
    </div>
  )
}
