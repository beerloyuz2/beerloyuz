import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";


export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const currentUser = await getCurrentUser()

        if (currentUser?.admin !== true) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const admin = await prismadb.user.findUnique({
            where: {
                id: params.userId
            }
        })

        if(admin?.email === currentUser.email){
            return new NextResponse("You can not unauthorize yourself.", { status: 401 })
        }

        if(admin?.email === "beerloyuz@gmail.com"){
            return new NextResponse("You can not unauthorize beerloyuz.", { status: 401 })
        }

        const user = await prismadb.user.updateMany({
            where: {
                id: params.userId
            },
            data: {
                admin: false
            }
        })



        return NextResponse.json(user);
    } catch (error) {
        console.log('[USER_UNAUTHORIZATION]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};