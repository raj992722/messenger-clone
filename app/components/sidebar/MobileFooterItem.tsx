'use client';
import Link from "next/link";
import clsx from "clsx";

interface MoblieFooterItemProps {
    href: string;
    label: string;
    active: boolean;
    onClick: () => void;
    icon: any;
}

const MobileFooterItem: React.FC<MoblieFooterItemProps> = ({
    label,
    href,
    active,
    onClick,
    icon: Icon
}) => {
    const handleClick = () => {
        if(onClick)  onClick();
       
    }
    return (

        <Link href={href} className={clsx(`  rounded-md  flex flex-col text-sm font-semibold leading-6 p-4 text-gray-500
        items-center justify-center w-full py-2`,`text-gray-400 hover:bg-gray-100 hover:text-black
        
        `,active && 'text-black bg-gray-100')} onClick={handleClick}>
            <Icon className='h-6 w-6' />

            <span>{label}</span>
           
        </Link>

    )
}

export default MobileFooterItem
