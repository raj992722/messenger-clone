'use client'

import AuthSocialButton from "@/app/components/AuthSocialButton";
import Button from "@/app/components/Button";
import Input from "@/app/components/input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER"

const AuthForm = () => {
    const router = useRouter();
    const session = useSession();
    const [variant, setVariant]= useState<Variant>("LOGIN");
    const [loading,setLoading]= useState(false);

    useEffect(()=>{
        if(session?.status === 'authenticated') router.push('/users')
    },[session?.status,router])

    const toggleVariant= useCallback(()=>{
        if(variant==="LOGIN"){
            setVariant("REGISTER")
        }else{
            setVariant("LOGIN")
        }
    },[variant])

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    })

    const onSubmit:SubmitHandler<FieldValues>= (data)=>{
        setLoading(true)

        if(variant==="LOGIN"){
            // nextauth login
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback)=>{
                if(callback?.error){
                    toast.error("Invalid credentials")
                }
                if(callback?.ok){
                    toast.success('Logged in!')
                }
            })
            .finally(()=>setLoading(false))
           
        }
        if(variant==="REGISTER"){
            // axios register
            axios.post('/api/register',data)
            .then(()=>signIn('credentials',data))
            .catch(()=>toast.error("Something went wrong!"))
            .finally(()=>setLoading(false))
        }
    }

    const socialAction = (action: string)=>{
        setLoading(true);

        // NextAuth social sign in
        signIn(action,{redirect:false})
        .then((callback)=>{
            if(callback?.error){
                toast.error('Invalid Credentials')
            }
            if(callback?.ok){
                toast.success('Logged in!')
            }
        })
        .finally(()=>setLoading(false));
    }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div 
        className="
            bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
        "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            { variant === "REGISTER" && 
            <Input label="Name" id="name" disabled={loading} register={register} errors={errors}/>
} 
            <Input id="email" label="Email" type='email' disabled={loading} register={register} errors={errors}/>
            <Input id="password" label="Password" type='password' disabled={loading} register={register} errors={errors}/>

            <div>
                <Button fullWidth disabled={loading} type="submit">{variant === "LOGIN" ? 'Sign in' : "Register"}</Button>
            </div>
        </form>

        <div className="mt-6">
            <div className="relative">
                <div 
                 className="absolute inset-0 flex items-center"
                >
                        <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm ">
                    <span className="bg-white px-2 text-gray-500">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="mt-6 flex gap-2">
                <AuthSocialButton icon={BsGithub} onClick={()=>socialAction('github')}/>
                <AuthSocialButton icon={BsGoogle} onClick={()=>socialAction('google')}/>
            </div>
        </div>

        <div className="flex justify-center gap-2 text-sm mt-6 px-2 text-gray-500 ">
             <div>
                {variant === "LOGIN" ? "New to Messenger?" : "Already have an account?"}
             </div>
             <div className="cursor-pointer underline" onClick={toggleVariant}>
                {variant==="LOGIN" ? "Create an account" : "Log in"}
             </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
