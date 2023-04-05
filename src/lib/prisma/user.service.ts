import type { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma/prisma'

export async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const data: Prisma.UserCreateInput = req.body
  try {
    const newUser = await prisma.user.create({ data })
    return res.status(200).json({ data: newUser, success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error creating data', success: false })
  }
}

export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    return res.status(200).json({ data: user, success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error getting data', success: false })
  }
}

export async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  const data: Prisma.UserUpdateInput = req.body
  const { id } = req.query
  try {
    const newUser = await prisma.user.update({ where: { id: Number(id) }, data })
    return res.status(200).json({ data: newUser, success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error updating data', success: false })
  }
}

export async function deleteUser(req: NextApiRequest, res: NextApiResponse){
  const { id } = req.query
  try {
    const user = await prisma.user.delete({where:{id:Number(id)}})
    return res.status(200).json({data: user, success: true})
  }catch (error){
    console.error('Request error', error)
    res.status(500).json({ error: 'Error deleting data', success: false })
  }
}
