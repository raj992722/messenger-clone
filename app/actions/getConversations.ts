import prisma from '@/app/libs/prismadb'

import { getCurrentUser } from './getCurrentUser'


const getConversations = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
        return [];
    }
    try {
        const conversations = await prisma.conversation.findMany({
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            orderBy: {
                lastMessageAt: 'desc'
            },
            include: {
                users: true,
                messages:{
                    include:{
                        sender:true,
                        seen:true
                    }
                }
            }
        });
        return conversations;
    } catch (error) {
        console.log("GET_CONVERSATION_ERROR",error)
        return [];
    }
};

export default getConversations;