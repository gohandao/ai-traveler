import type {NextApiRequest, NextApiResponse} from "next";

import {prisma} from "@/lib/prisma/prisma";

export async function getHistory(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query
    try {
        const user = await prisma.user.findUnique({ where: { id : id as unknown as number}})
        return res.status(200).json({ data: user, success: true })
    } catch (error) {
        console.error('Request error', error)
        res.status(500).json({ error: 'Error getting data', success: false })
    }
}