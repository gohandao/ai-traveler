import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useDefaultForm } from '../lib/UseDefaultForm'

import type { NextPage } from 'next'
import type { ChatCompletionRequestMessage } from 'openai'

import { createChatGPTResponse } from '@/lib/openai'

const schema = z.object({
  message: z.string().refine(value => value.length > 0, 'メッセージを入力してください'),
})

type Schema = z.infer<typeof schema>

type Message = {
  message: string
  sentTime: string
  sender: 'ChatGPT' | 'user'
}

const Chat: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: 'just now',
      sender: 'ChatGPT',
    },
  ])

  const apiMessages = messages.map(message => ({
    role: message.sender === 'ChatGPT' ? 'assistant' : 'user',
    content: message.message,
  }))

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

  const onSubmit = async (data: Schema) => {
    const currentTime = new Date().toLocaleTimeString()
    const newMessage: Message = {
      message: data.message,
      sentTime: currentTime,
      sender: 'ChatGPT',
    }
    const newApiMessage: ChatCompletionRequestMessage = {
      role: 'user',
      content: data.message,
    }
    const newApiMessages = [...apiMessages, newApiMessage] as ChatCompletionRequestMessage[]
    const response = await createChatGPTResponse(newApiMessages)

    if (response) {
      const chatResponse: Message = {
        message: response,
        sentTime: currentTime,
        sender: 'ChatGPT',
      }
      setMessages([...messages, newMessage, chatResponse])
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register('message')} />
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
        <button type="submit">送信</button>
      </form>
    </div>
  )
}

export default Chat
