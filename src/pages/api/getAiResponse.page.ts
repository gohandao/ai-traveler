import type { NextApiRequest, NextApiResponse } from 'next'

import { createAiResponse } from '@/lib/openai'

export const getAiResponse = async (req: NextApiRequest, res: NextApiResponse) => {
  const param = req.query.prompt as string
  const prompt = decodeURI(param)
  try {
    const response = await createAiResponse(prompt)
    res.json(response.choices[0].text)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
  return
}
export default getAiResponse
