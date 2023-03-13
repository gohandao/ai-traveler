/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useDefaultForm } from '../lib/UseDefaultForm'

import type { NextPage } from 'next'
import type { ChatCompletionRequestMessage } from 'openai'

import { createChatGPTResponse } from '@/lib/openai'

const schema = z.object({
  message: z.string().refine(value => value !== '', {
    message: 'メッセージを入力してください',
  }),
})

type Schema = z.infer<typeof schema>

type Message = {
  message: string
  sentTime: string
  sender: string
}
const Chat: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: 'just now',
      sender: 'ChatGPT',
    },
  ])
  const apiMessages = messages.map(message => {
    let role = ''
    role = message.sender === 'ChatGPT' ? 'assistant' : 'user'
    return { role: role, content: message.message }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useDefaultForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
    },
  })

  const onsubmit = async (data: Schema) => {
    const currentTime = new Date().toLocaleTimeString()
    const newMessage = {
      message: data.message,
      sentTime: currentTime,
      sender: 'ChatGPT',
    }
    const newApiMessage = {
      role: 'user',
      content: data.message,
    } as ChatCompletionRequestMessage

    const newApiMessages = [...apiMessages, newApiMessage] as ChatCompletionRequestMessage[]
    const response = await createChatGPTResponse(newApiMessages)

    if (response) {
      setMessages([
        ...messages,
        newMessage,
        {
          message: response,
          sentTime: currentTime,
          sender: 'ChatGPT',
        },
      ])
    }
    reset()
  }

  return (
    <div>
      <div className="flex flex-col gap-5">
        {messages.map((message, index) => (
          <div className="flex" key={index}>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <textarea {...register('message')}></textarea>
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
        <button type="submit">送信</button>
      </form>
    </div>
  )
}

export default Chat
