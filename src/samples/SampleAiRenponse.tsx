import { useState } from 'react'

export const SampleAiRenponse = async () => {
  const [output, setOutput] = useState<string>('')
  const prompt = '例）東京都のおすすめ観光地は？'
  const response = await fetch('/api/getAiResponse?prompt=' + prompt, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .catch(error => {
      console.error(error)
    })
  typeof response == 'string' && setOutput(response)
  return <p>{output}</p>
}
