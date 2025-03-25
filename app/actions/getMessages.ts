import prisma from '@/app/libs/prismadb'

const getMessages = async (conversationId:string) => {  
    try {
        const messages = await prisma.message.findMany({
            where:{
                conversationId:conversationId
            },
            include:{
                sender:true,
                seen:true
            },
            orderBy:{
                createAt:'asc'
            }
        });
        return messages;
    } catch (error) {
        return null;
    }
}

export default getMessages;
//  The  getMessages  function is used to get the messages for a specific conversation.