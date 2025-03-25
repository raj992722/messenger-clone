import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
    // return new NextResponse('Not Found', { status: 404 });
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            userId,
            isGroup,
            members,
            name
        } = body;
        if (!currentUser?.id || !currentUser?.email) return new NextResponse('Unauthorized', { status: 401 });
        if (!userId) {
            return new NextResponse('User not found', { status: 404 });
        }
        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            { id: currentUser.id },
                            ...members.map((member:{value:string}) => ({ id:member.value }))
                        ]
                    }
                },
                include: {
                    users: true
                }
            }
            )
            newConversation.users.forEach((user)=>{
                if(user.email){
                    pusherServer.trigger(user.email,'conversation:new',newConversation)
                }
            })
            return NextResponse.json(newConversation, { status: 201 });
        }

        const existingConversation = await prisma.conversation.findMany({
            where: {
                OR: [
                 {
                    userIds:{
                        equals:[userId,currentUser.id]
                    }
                 },
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    }
                ]

         }
       });

        const singleConversation = existingConversation[0];
        if (singleConversation) {
            return NextResponse.json(singleConversation, { status: 200 });
        }
        
       const conversation = await prisma.conversation.create({
            data: {
               users:{
                     connect:[
                          {id:currentUser.id},
                          {id:userId}
                     ]

               }
            },
            include: {
                users: true
            }
        });

        conversation.users.forEach((user)=>{
            if(user.email){
                pusherServer.trigger(user.email,'conversation:new',conversation)
            }
        })
        
        return NextResponse.json(conversation, { status: 201 });
    } catch (error: any) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}