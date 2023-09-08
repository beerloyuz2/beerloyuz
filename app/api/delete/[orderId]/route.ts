import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    try {

        const currentUser = await getCurrentUser()

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!params.orderId) {
            return new NextResponse("Order id is required", { status: 400 });
        }

        const order = await prismadb.order.delete({
            where: {
                id: params.orderId,
            }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.log('[ORDER_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};