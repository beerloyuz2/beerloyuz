import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function DELETE(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    try {

        const currentUser = await getCurrentUser()

        if (!currentUser) {
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

export async function PATCH(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        const body = await req.json()

        const { height, width, other, amount, price, color } = body;

        Object.keys(body).forEach((value: any) => {
            if (!body[value]) {
                NextResponse.error()
            }
        })

        const order = await prismadb.order.updateMany({
            where: {
                id: params.orderId,
            },
            data: {
                height,
                width,
                other,
                color,
                amount,
                price,
                totalPrice: price * amount
            }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.log('[ORDER_UPDATE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};