import type { NextApiRequest, NextApiResponse } from 'next'

import {createUser, deleteUser, getUser, updateUser} from "@/lib/prisma/user.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      return await getUser(req,res)
    }
    case 'PUT': {
      return await updateUser(req, res)
    }
    case "DELETE": {
      return await deleteUser(req, res)
    }
    case "POST": {
      return await createUser(req, res)
    }
    default: {
      return res.status(405).json({ message: 'Method not allowed', success: false })
    }
  }
}
