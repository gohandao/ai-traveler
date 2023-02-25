import { useState } from 'react'

import axios from 'axios'

export const SampleAiRenponse = async () => {
  const [output, setOutput] = useState<string>('')
  const prompt = '例）東京都のおすすめ観光地は？'
  try {
    const { data } = await axios.post(
      '/api/getAiResponse',
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    typeof data === 'string' && setOutput(data)
  } catch (error) {
    console.error(error)
  }
  return <p>{output}</p>
}
