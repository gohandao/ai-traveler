import type {Prisma} from "@prisma/client";
import type {NextApiRequest, NextApiResponse} from "next";

import {prisma} from "@/lib/prisma/prisma";

export async function updateHistory(req: NextApiRequest, res: NextApiResponse){
    const data : Prisma.UserUpdateInput = req.body
    const { id } = req.query
    try {
        const newHistory = await prisma.user.update({where:{id: id as unknown as number},data})
        return res.status(200).json({ data: newHistory, success: true })
    } catch (error) {
        console.error('Request error', error)
        res.status(500).json({ error: 'Error getting data', success: false })
    }
}