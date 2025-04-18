import bcrypt from 'bcrypt';


import { NextResponse } from 'next/server';

import prisma from "@/app/libs/prismadb"

export async function POST(
    request: Request
) {
    try {



        const body = await request.json();

        const { email, name, password } = body;

        if (!email || !password || !name) {
            return new NextResponse("Missing info", { status: 400 });
        }

        const hasedPassword = await bcrypt.hash(password, 12);

        const user = await prisma?.user.create({
            data: {
                email,
                name,
                hasedPassword
            }
        });

        return NextResponse.json(user)
    } catch (error) {
        console.log(error, "REGISTRATION ERROR");
        return new NextResponse("Internal error",{status:500})
    }

}