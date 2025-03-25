'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/input";
import Select from "@/app/components/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";


interface GroupChatModalProps{
    users:User[]
}

const GroupChatModal:React.FC<GroupChatModalProps> = ({users})=>{
    const [isLoading,setIsLoading] = useState(false);
    const router = useRouter();


    const {
        register,
        handleSubmit,
        formState:{
            errors
        },
        setValue,
        watch
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            members:[]
        }
    });
    const members= watch('members')
    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);
        axios.post('/api/conversations',{
            ...data,
            isGroup:true,
        })
        .then(()=>{
          router.refresh();
           
        })
        .catch(()=>{
           toast.error("Something went wrong!") 
        })
        .finally(()=>setIsLoading(false))

    }
    return (
       <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10">
                    <h2 
                    className="text-base font-semibold leading-7 text-gray-900 "
                    >
                        Create a group chat 
                    </h2>
                    <p
                    className="mt-1 text-sm leading-6 text-gray-600 "
                    >
                        Create a chat with more than 2 people.
                    </p>
                    <div className="mt-10 flex flex-col gap-y-8">
                        <Input
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                        label="Name"
                        id="name"
                        required
                        />
                        <Select
                        disabled={isLoading}
                        label="Members"
                        options={users.map((user)=>({
                            value:user.id,
                            label:user.name
                        }))}
                        onChange={(value)=>setValue('members',value,{shouldValidate:true})}
                        value={members}
                        />
                    </div>
                </div>
            </div>
            <div 
            className="mt-6 flex items-center justify-end gap-x-6"
            >
                <Button secondary type="button" disabled={isLoading} >
                        Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    Create
                </Button>
            </div>
       </form>
    )
}

export default GroupChatModal;