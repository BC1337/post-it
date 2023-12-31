import type {  NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client'




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
   
    if(req.method === "POST") {

          // Parse the request body
        const { body } = req;
        const session = await getServerSession(req,res, authOptions)
        
        if(!session)
         return res.status(401).json({message: 'Please sign in'})

        //  get user
        const prismaUser = await prisma.user.findUnique({
           where: { email: session?.user?.email}, 
        })

        try {
            // delete a post
            const { title, postId } = req.body.data
        
            if(!title.length){
                return res.status(401).json({message: 'Please enter something'})
            }

            const result = await prisma.comment.create({
                data: {
                    message: title,
                    userId: prismaUser?.id,
                    postId
                },
            })

            res.status(200).json(result)
        } catch (error) {
            res.status(403).json({err: 'Error Message for deleting a post! UH OH'})
        }
    }
}

