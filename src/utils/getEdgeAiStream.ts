import type { SetStateAction } from 'react'

type Props = {
  prompt: string
  setOutput: (value: SetStateAction<string>) => void
  setLoading: (value: SetStateAction<boolean>) => void
}
export const getEdgeAiStream = async ({ prompt, setOutput, setLoading }: Props) => {
  setOutput('')
  setLoading(true)
  const response = await fetch(`/api/getEdgeAiResponse?prompt=${prompt}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
    }),
  })
  console.log('Edge function returned.')

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  // This data is a ReadableStream
  const data = response.body
  if (!data) {
    return
  }

  const reader = data.getReader()
  const decoder = new TextDecoder()
  let done = false

  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    const chunkValue = decoder.decode(value)
    setOutput(prev => prev + chunkValue)
  }

  setLoading(false)
}
