'use client'

import { Conversation, User } from '@prisma/client'
import { FullConversationType } from '@/app/types/index';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useConversation from '@/app/hooks/useConversation';
import clsx from 'clsx';
import { MdOutlineGroup, MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';
import Modal from '@/app/components/Modal';
import GroupChatModal from './GroupChatModal';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';
// import FullConservationType from '@/types/index';
interface ConversationListProps {
  initialItems: FullConversationType[],
  users:User[]
}
const ConversationList: React.FC<ConversationListProps> = ({ initialItems ,users}) => {
  const session= useSession();
  const [items, setItems] = useState<FullConversationType[]>(initialItems);
  const [isModalOpen,setIsModalOpen] =useState(false);
  const router = useRouter();

  const { isOpen, conversationId } = useConversation();

  const pusherKey = useMemo(()=>{
    return session.data?.user?.email
  },[session.data?.user?.email])

  useEffect(()=>{
    if(!pusherKey) return;
    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation:FullConversationType)=>{
      setItems((current)=>{
        if(find(current, {id: conversation.id})){
          return current;
        }
        return [conversation,...current];
      })
    };

    const updateHandler = (conversation: FullConversationType)=>{
      setItems((current)=>current.map((currentConversation)=>{
        if(currentConversation.id === conversation.id){
          return {
            ...currentConversation,
            messages:conversation.messages,

          }
        }
        return currentConversation;
      }))
    }
    const deleteHandler = (conversation:FullConversationType)=>{
      setItems((current)=>{
        return [...current.filter((convo)=>convo.id !==conversation.id)]
      })
      if(conversationId === conversation.id){
        router.push('/conversations');
      }
    }
    pusherClient.bind('conversation:new',newHandler);
    pusherClient.bind("conversation:update",updateHandler);
    pusherClient.bind('conversation:remove',deleteHandler)

    return () =>{
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new',newHandler)
      pusherClient.unbind('conversation:update',updateHandler)
      pusherClient.unbind('conversation:remove',deleteHandler)
    }
  },[pusherKey,conversationId,router]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}>
        <GroupChatModal users={users}/>
      </Modal>
      <aside
        className={clsx(`
          fixed
          inset-y-0
          left-0
          lg:ml-20
          lg:pl-0
          lg:w-80
          lg:block
          overflow-y-auto
          border-r
          border-gray-200`, isOpen ? 'hidden' : "block w-full ")}
      >
        <div className='px-5'>
          <div className='flex mb-4 pt-4 justify-between '>
            <div className='text-2xl font-bold text-neutral-800'>
              Messages
            </div>
            <div onClick={()=>setIsModalOpen(true)} className='text-gray-600 hover:opacity-75 transition cursor-pointer rounded-full bg-gray-100 p-2'>
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          <div className='flex flex-col'>
            {items.map((item: FullConversationType) => (
              <ConversationBox key={item.id} conversation={item} selected={conversationId === item.id} />
            ))}

          </div>
        </div>

      </aside>
    </>
  )
}

export default ConversationList
