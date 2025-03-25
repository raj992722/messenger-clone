'use client'

import { FullConversationType } from "@/app/types"
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Message, User, Conversation } from '@prisma/client';
import useOtherUser from "@/app/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";
import AvatarGroup from "@/app/components/AvatarGroup";


interface ConversationBoxProps {
    conversation: FullConversationType,
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ conversation, selected }) => {
    const otherUser = useOtherUser(conversation);
    const router = useRouter();
    const session = useSession();
    const handleClick = useCallback(() => {
        router.push(`/conversations/${conversation.id}`);
    }, [conversation.id, router]);
    const lastMessage = useMemo(() => {
        return conversation.messages[conversation.messages.length - 1];
    }
        , [conversation.messages]);
    // const lastMessageText = useMemo(()=>{
    //     if(lastMessage){
    //         return lastMessage.text;
    //     }
    //     return "";
    // },[lastMessage]);
    // const lastMessageTime = useMemo(()=>{
    //     if(lastMessage){
    //         return lastMessage.createdAt;
    //     }
    //     return "";
    // },[lastMessage]);
    // const lastMessageSender = useMemo(()=>{
    //     if(lastMessage){
    //         return lastMessage.senderId;
    //     }
    //     return "";
    // }
    // const lastMessageSenderName = useMemo(()=>{ 
    //     if(lastMessageSender){
    //         return lastMessageSender.name;
    //     }
    //     return "";
    // }
    // ,[lastMessageSender]);
    // const lastMessageSenderImage = useMemo(()=>{
    //     if(lastMessageSender){
    //         return lastMessageSender.image;
    //     }
    //     return "";
    // }
    // ,[lastMessageSender]);
    // const lastMessageSenderId = useMemo(()=>{
    //     if(lastMessageSender){
    //         return lastMessageSender.id;
    //     }
    //     return "";
    // }
    // ,[lastMessageSender]);
    const userEmail = useMemo(() => {
        if (session.data) {
            return session?.data?.user?.email;
        }
        return "";
    }, [session.data]);
        

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return true;
        }
        const seenArray = lastMessage.seen || [];
        if (!userEmail) {
            return false;
        }
        return seenArray.filter(user => user.email === userEmail).length > 0;
    }
        , [lastMessage, userEmail]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return "Sent an image";
        }
        if (lastMessage?.body) {
            return lastMessage.body;
        }

        return "Started a conversation";

    }
        , [lastMessage]);

    return (
        <div onClick={handleClick} className={clsx("flex items-center p-2 cursor-pointer w-full relative space-x-3",
         "hover:bg-neutral-100 rounded-lg transition", 
         selected ? "bg-neutral-200" :"bg-white")}
         >
            {conversation?.isGroup ? (
                <AvatarGroup users={conversation.users}/>
            ):(
                
                <Avatar user={otherUser} />
            )}
            <div className='flex-1 min-w-0'>

                <div className="focus:outline-none">
                    <div className="flex items-center justify-between">
                        <p className="text-md font-medium text-gray-900">{conversation.name || otherUser?.name}</p>

                        {lastMessage?.createAt && (

                            <p className="text-sm text-gray-500">{format(new Date(lastMessage.createAt), "p")}</p>
                        )}


                    </div>
                    <p className="text-sm text-gray-500 truncate">{lastMessageText}</p>
                </div>
                {!hasSeen && (
                    <span className="absolute top-2 right-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                )}
            </div>





        </div>
    )
}

export default ConversationBox;