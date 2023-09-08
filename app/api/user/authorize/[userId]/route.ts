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


        const user = await prismadb.user.updateMany({
            where: {
                id: params.userId
            },
            data: {
                admin: true
            }
        })

        return NextResponse.json(user);
    } catch (error) {
        console.log('[USER_AUTHORIZATION]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};