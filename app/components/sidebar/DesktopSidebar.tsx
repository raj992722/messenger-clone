'use client'

import useRoutes from "@/app/hooks/useRoutes"
// import Link from "next/link";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import {User} from "@prisma/client"
import Avatar from "../Avatar";
// import { getCurrentUser } from "@/app/actions/getCurrentUser";
import SettingsModal from "./SettingsModal";

interface DesktopSideBarProps {
    user: User | null;
}

const DesktopSidebar:React.FC<DesktopSideBarProps> = ({user}) => {
    const routes = useRoutes(); 
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
        <SettingsModal
            user={user}
            isOpen={isOpen}
            onClose={()=>setIsOpen(false)}
        />
        <div
            className="
            hidden
            lg:fixed
            lg:inset-y-0
            lg:left-0
            lg:w-20
            lg:z-40
            xl:px-6
            lg:overflow-y-auto
            lg:bg-white
            lg:border-r-[1px]
            lg:border-gray-200
            lg:flex
            lg:flex-col
            lg:justify-between

            "
        >
            {/* <nav className="mt-4 lg:mt-8 lg:pb-8  lg:overflow-y-auto lg:flex lg:flex-col lg:justify-between">
                {routes.map((route) => (
                    <Link key={route.href} href={route.href} className={`
                        lg:px-2
                        lg:py-2
                        lg:mb-2
                        lg:rounded-md
                        lg:text-gray-900
                        lg:hover:bg-gray-100
                        lg:transition
                        lg:duration-200
                        lg:ease-in-out
                    
                        lg:flex
                        lg:items-center
                        lg:justify-center
                        lg:space-x-2
                        lg:space-y-1
                        lg:text-sm
                        lg:leading-5
                        lg:font-semibold
                        lg:group
                        lg:cursor-pointer
                        lg:group-hover:text-gray-900
                        lg:group-hover:bg-gray-100
                        lg:group-hover:rounded-md
                        lg:group-hover:shadow-md
                        lg:group-hover:transition
                        lg:group-hover:duration-200
                        lg:group-hover:ease-in-out
                        `}>
                        
                            {route.icon && <route.icon className="lg:w-6 lg:h-6 lg:text-gray-500" />}
                            <span className="hidden lg:block">{route.label}</span>
                    
                    </Link>
                ))}

            </nav> */}
            <nav className="mt-4 flex flex-col justify-between">
                <ul className="flex flex-col items-center space-y-1">
                    {routes.map((item) => (
                        <DesktopItem
                        key={item.label}
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        active={item.active!}
                        onClick={item.onClick}
                        />
                    ))}
                </ul>
            </nav>
            <nav className="mt-4 lg:mb-8 flex justify-center ">
                <div onClick={() => setIsOpen(!isOpen)} >
                    <Avatar user={user} />

                </div>

            </nav>
        </div>
    </>
  )
}

export default DesktopSidebar
