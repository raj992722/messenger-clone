"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";

import MobileFooterItem from "./MobileFooterItem";

const MobileFooter = () => {
    const { isOpen } = useConversation();
    const routes = useRoutes();
    if (isOpen) return null;
    return (
        <div className="fixed bottom-0 z-40 justify-between bg-white border-t border-gray-200 flex w-full lg:hidden  items-center">
            {routes.map((route) => (
                <MobileFooterItem key={route.label} label={route.label} active={route.active!} onClick={route.onClick!} icon={route.icon} href={route.href} />
            ))}


        </div>
    )
}

export default MobileFooter;