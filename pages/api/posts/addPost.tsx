import type {  NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


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

          // Return a response to the client
        return res.status(200).json({message: 'Post successfully submitted'});
    }
}

