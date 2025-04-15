import {getSession} from './getSession';

import prisma from '@/app/libs/prismadb'

const getUsers = async () => {
    const session = await getSession();
    if(!session?.user?.email) {
        return [];
    }
    // Fetch users from the server
    try {
        const users= await prisma?.user.findMany({
            where: {
                email: {
                    not: session.user.email
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return users;
    } catch (error) {
        console.log(error,"GET_USERS")
        return [];
    }
};

export default getUsers;