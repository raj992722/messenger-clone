import { getCurrentUser } from "@/app/actions/getCurrentUser";
// import { Erica_One } from "next/font/google";
import { NextResponse } from "next/server";

export async function POST(
    request:Request
){
try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
        name,
        image
    }=body;
    if(!currentUser?.id){
        return new NextResponse('Unauthorised',{status:401});
    }

    const updateUser = await prisma?.user.update({
        where:{
            id:currentUser.id,
        },
        data:{
            image:image,
            name:name
        }
    });

    return NextResponse.json(updateUser);
} catch ( error) {
    console.log(error,"ERROR_SETTINGS");
    return new NextResponse("Internal Error",{status:500})
}
}