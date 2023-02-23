import { Configuration, OpenAIApi } from 'openai'

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const configuration = new Configuration({
  // organization: "xxxx-xxxx",
  apiKey: OPENAI_API_KEY,
})
export const openai = new OpenAIApi(configuration)

export const createAiResponse = async (prompt: string) => {
  const option = {
    model: 'text-davinci-003',
    temperature: 0.9,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }
  const object = { ...option, prompt: prompt }
  const response = await openai.createCompletion(object)
  return response.data
}
