import { PrismaClient } from '@prisma/client'

import type { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return await createHistory(req, res)
  } else if (req.method === 'GET') {
    return await getHistory(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

async function createHistory(req: NextApiRequest, res: NextApiResponse) {
  const data: Prisma.HistoryCreateInput = req.body
  try {
    const newHistory = await prisma.history.create({ data })
    return res.status(200).json({ data: newHistory, success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error creating data', success: false })
  }
}

async function getHistory(req: NextApiRequest, res: NextApiResponse) {
  const body: { userId: string } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { uuid: body.userId } })
    return res.status(200).json({ data: user, success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error getting data', success: false })
  }
}
