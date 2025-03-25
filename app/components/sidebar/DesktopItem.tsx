
'use client'

import clsx from "clsx";
import Link from 'next/link'

interface DesktopItemProps {
  href: string; 
    label: string;
    active:boolean;
    icon:React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?:()=>void;
}
const DesktopItem:React.FC<DesktopItemProps> = ({
    href,
    label,
    active,
    icon:Icon,
    onClick
}) => {

    const handleClick = (e:React.MouseEvent<HTMLLIElement, MouseEvent>)=>{
        e.preventDefault();
        if(onClick){
          return  onClick();
        } 
    }

  return (
    <li onClick={handleClick} className={clsx(
      "px-2",active && "bg-gray-100",
      "py-2",
      "mb-2",
      "rounded-md",
      "text-gray-900",
      "hover:bg-gray-100",
      "transition",
      "duration-200",
      "ease-in-out",
      "flex",
      "items-center",
      "justify-center",
      "space-x-2",
      "space-y-1",
      "text-sm",
      "leading-5",
      "font-semibold",
      "group",
      "cursor-pointer",
      "group-hover:text-gray-900",
      "group-hover:bg-gray-100",
      "group-hover:rounded-md",
      "group-hover:shadow-md",
      "group-hover:transition",
      "group-hover:duration-200",
      "group-hover:ease-in-out"
    )}>
        <Link href={href} >
        {Icon && <Icon className="w-6 h-6 text-gray-500" />}
        <span className="hidden lg:block">{label}</span>
        </Link>
    </li>
  )
}

export default DesktopItem
