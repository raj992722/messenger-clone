import { User } from '@prisma/client';
import Image from 'next/image'
import useActiveList from '../hooks/useActiveList';

interface AvatarProps {
    user?: User | null;
}

const Avatar:React.FC<AvatarProps> = ({user}) => {
  const {members}=useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className='relative '>
        <div className='relative h-9 w-9 md:h-11 md:w-11 inline-block rounded-full  hover:opacity-80 hover:shadow-lg hover:ring-1 hover:ring-gray-900'>
            <Image
            alt='avatar'
            src={user?.image || '/placeholder.jpeg'}
            className='rounded-full'
            layout='fill'
            fill
            />
            {isActive && (
              <span className='absolute top-[0px] z-40 right-0 h-3 w-3 md:h-4 md:w-4 bg-green-500 rounded-full border-2 border-white'></span>

            )}

            

        </div>
      
    </div>
  )
}

export default Avatar
