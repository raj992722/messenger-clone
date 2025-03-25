'use client'

import useConversation from "@/app/hooks/useConversation"
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from './MessageInput'
import { HiPaperAirplane } from "react-icons/hi";
import { CldUploadButton, CldUploadWidget } from 'next-cloudinary'
import { useFormState } from "react-dom";
import { useState } from "react";

const Form = () => {
    const { conversationId } = useConversation();
    const [resources, setResources] = useState();
    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors
        }

    } = useForm<FieldValues>({
        defaultValues: {
            message: ""
        }
    })

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }
    return (
        <div className="py-4 px-4 bg-white flex items-center gap-2 border-t border-gray-100 lg:gap-3 w-full">
            {/* <CldUploadButton
            options={{maxFiles:1}}
            onUpload={handleUpload}
            uploadPreset="schooll"
        >

            
        </CldUploadButton>
        <CldUploadWidget */}
            <CldUploadWidget
                options={{maxFiles:1}}
                uploadPreset="schooll"
                onSuccess={(result, { widget }) => {
                    console.log(result)
                    
                    // { public_id, secure_url, etc }
                    axios.post('/api/messages', {
                        image: result?.info?.secure_url,
                        conversationId
                    })
                }}
                onQueuesEnd={(result, { widget }) => {
                    widget.close();
                }}
            >
                {({ open }) => {
                    function handleOnClick() {
                        setResources(undefined);
                        open();
                    }
                    return (
                        <button onClick={handleOnClick}>
                            <HiPhoto size={30} className="text-sky-500 " />
                        </button>
                    );
                }}
            </CldUploadWidget>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex items-center gap-3 lg:gap-5 w-full' >

                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message" />
                <button type='submit'
                    className="rounded-full flex-1 p-3 bg-sky-500
            hover:bg-sky-600 transition cursor-pointer" >
                    <HiPaperAirplane size={18} className="text-white rotate-90" />
                </button>
            </form>
        </div>
    )
}

export default Form
