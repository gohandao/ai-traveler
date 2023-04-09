import type { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma/prisma'

export async function createHistory(req: NextApiRequest, res: NextApiResponse) {
  const data: Prisma.HistoryCreateInput = req.body
  try {
    const newHistory = await prisma.history.create({ data })
    return res.status(200).json({ data: newHistory, success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error creating data', success: false })
  }
}
export async function deleteHistory(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  try {
    const history = await prisma.history.delete({ where: { id: Number(id) } })
    res.status(200).json({ data: history, success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error deleting data', success: false })
  }
}
