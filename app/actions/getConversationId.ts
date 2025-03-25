import prisma from '@/app/libs/prismadb'

import { getCurrentUser } from './getCurrentUser'
import { exportTraceState } from 'next/dist/trace';

const getConversationId = async (conversationId:string) => {
 
    try {
        const currentUser =await getCurrentUser();
        if(!currentUser?.email){
            return null;
        }
        const conversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true
            }
        });
        return conversation;
    } catch (error) {
        return null;
    }

   
  }


  export default getConversationId;
