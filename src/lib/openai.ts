import { Configuration, OpenAIApi } from 'openai'

import type { ChatCompletionRequestMessage } from 'openai'

// 一旦PUBLICにしているが、本番環境では非公開にする
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})
export const openai = new OpenAIApi(configuration)

const systemMessage: ChatCompletionRequestMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: 'system',
  content: 'あなたは優秀な旅行アドバイザーです。日数、予算、場所の情報をもとに、旅行プランを提案してください。',
}
export const createChatGPTResponse = async (messages: ChatCompletionRequestMessage[]): Promise<string | undefined> => {
  const apiMessages = [systemMessage, ...messages]
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: apiMessages,
  })
  return completion.data.choices[0].message?.content
}
