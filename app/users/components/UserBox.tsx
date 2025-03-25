'use client'
import Avatar from "@/app/components/Avatar"
import LoadingModal from "@/app/components/LoadingModal"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

interface UserBoxProps {
    user: User
}
const UserBox:React.FC<UserBoxProps> = ({user}) => {
    const [isLoading,setIsLoading] = useState(false);
    const router = useRouter();
    const handleClick = useCallback(()=>{
        setIsLoading(true);
        axios.post('/api/conversations',{
            userId:user.id
        }).then((response)=>{
            router.push(`/conversations/${response.data.id}`)
        }).finally(()=>{
            setIsLoading(false);
        })
    },[user.id,router])
  return (
    <>
        {isLoading && (
            <LoadingModal />
        )}

        <div onClick={handleClick} className="
            w-full
            flex
            items-center
            space-x-4
            cursor-pointer
            hover:bg-gray-100
            bg-white
            rounded-lg
            transition
            p-2
            border-b
            border-gray-200
            hover:border-gray-300
            
        ">
        <Avatar user={user}/>
        <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <div className="text-sm capitalize font-semibold text-neutral-800">
                        {user.name}
                    </div>
                        
                </div>

        </div>
        </div>
    </>
  )
}

export default UserBox
