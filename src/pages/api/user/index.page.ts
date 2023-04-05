import type { NextApiRequest, NextApiResponse } from 'next'

import { createUser } from '@/lib/prisma/user.service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return req.method === 'POST'
    ? await createUser(req, res)
    : res.status(405).json({ message: 'Method not allowed', success: false })
}
