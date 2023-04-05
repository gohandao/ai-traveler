import type { NextApiRequest, NextApiResponse } from 'next'

import {createHistory} from "@/lib/prisma/create";
import { getHistory } from '@/lib/prisma/get';
import {updateHistory} from "@/lib/prisma/update";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
  case 'POST': {
    return await createHistory(req, res)
  }
  case 'GET': {
    return await getHistory(req, res)
  }
  case "PUT": {
    return await updateHistory(req,res)
  }
  default: {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
  }
}
