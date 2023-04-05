import type { NextApiRequest, NextApiResponse } from 'next'

import {createHistory, deleteHistory} from '@/lib/prisma/history.service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      return await createHistory(req, res)
    }
    case 'DELETE': {
      return await deleteHistory(req, res)
    }
    default: {
      return res.status(405).json({ message: 'Method not allowed', success: false })
    }
  }
}
