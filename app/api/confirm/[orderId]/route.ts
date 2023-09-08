import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function PATCH(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    try {

        const currentUser = await getCurrentUser()

        if (currentUser?.admin !== true) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const order = await prismadb.order.updateMany({
            where: {
                id: params.orderId,
            },
            data: {
                confirmed: true
            }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.log('[ORDER_CONFIRM]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};