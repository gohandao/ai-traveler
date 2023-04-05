import type { NextApiRequest, NextApiResponse } from 'next'

import {createHistory, getHistory} from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return await createHistory(req, res)
  } else if (req.method === 'GET') {
    return await getHistory(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}
