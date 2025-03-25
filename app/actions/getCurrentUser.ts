
import {getSession} from './getSession';
import prisma from '@/app/libs/prismadb';
import { User } from '@prisma/client';



export const getCurrentUser = async () => {
    const session = await getSession();
    if (!session) return null;
    const user = await prisma.user.findUnique({
        where: {
            email: session.user?.email as string
        }
    });
    return user;
}