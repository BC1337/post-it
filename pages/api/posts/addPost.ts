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
         return res.status(401).json({message: 'Please sign in to make a post'})

         console.log(body)
        
         const title: string = req.body.title

        // Get User

        const prismaUser = await prisma.user.findUnique({
            where: { email: session?.user?.email },
        })


        //  Check title
        if(title.length > 300){
         return res.status(403).json({message: 'Please write a shorter post.'})
        }
        if(!title.length) {
         return res.status(403).json({message: 'Enter a message.'})
        }

        // Create epost
        try {
            const result = await prisma.post.create({
                data: {
                    title,
                    userId: prismaUser.id,  
                },
            })
            res.status(200).json(result)
        } catch (error) {
            res.status(403).json({err: 'Error Message, IT DID THE THING'})
        }
    }
}

