'use client'

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../input";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import Button from "../Button";
import { HiPhoto } from "react-icons/hi2";

interface SettingsModalProps {
    isOpen?: boolean,
    onClose: () => void;
    user: User | null
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    user
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: user?.name,
            image: user?.image
        }
    })

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post(`/api/settings`, data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => {
                toast.error("Something went wrong!")
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    return (

        <Modal isOpen={isOpen} onClose={onClose} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="
                            text-base
                            font-semibold
                            leading-7
                        ">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Edit your public information.
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input register={register} label="Name" disabled={isLoading} id="name" required errors={errors} />
                        </div>
                        <div>
                            <label className="
                            block
                            text-sm
                            leading-6
                            font-medium
                            text-gray-900
                            ">
                                Photo
                            </label>
                            <div className="
                            mt-2
                            flex
                             items-center
                             gap-x-3
                            ">
                                <Image
                                    height={48}
                                    width={48}
                                    className="rounded-full"
                                    src={image || user?.image || '/placeholder.jpeg'}
                                    alt="image"
                                />
                                <CldUploadWidget
                                    options={{ maxFiles: 1 }}
                                    uploadPreset="schooll"
                                    onSuccess={(result, { widget }) => {
                                        console.log(result)

                                        // { public_id, secure_url, etc }
                                        handleUpload(result)
                                        
                                    }}
                                    onQueuesEnd={(result, { widget }) => {
                                        widget.close();
                                    }}
                                >
                                    {({ open }) => {
                                        function handleOnClick() {
                                            setValue('image',undefined);
                                            open();
                                        }
                                        return (
                                            <Button disabled={isLoading} secondary type="button" onclick={handleOnClick}>
                                                <HiPhoto size={30} className="text-sky-500 " />
                                                <span className="ml-2 text-sm font-semibold">Change</span>
                                            </Button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </div>
                        </div>
                    </div>
                     <div className="
                     mt-6
                     flex
                     items-center
                     justify-end
                     gap-x-6
                     ">
                        <Button
                         disabled={isLoading}
                         secondary
                         onclick={onClose}
                        >
                           Cancel 
                        </Button>
                        <Button
                         disabled={isLoading}
                       
                         type="submit"
                        >
                           Save 
                        </Button>
                    </div>       

                </div>
            </form>
        </Modal>
    )
}

export default SettingsModal;