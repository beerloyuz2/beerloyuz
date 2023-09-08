import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"


export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }


    const body = await request.json()

    const { height, width, amount, price, productId, other, color } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error()
        }
    })

    const order = await prisma.order.create({
        data: {
            height,
            width,
            amount,
            other,
            color,
            price,
            productId,
            userId: currentUser.id,
            totalPrice: price * amount

        }
    })
    return NextResponse.json(order)
}