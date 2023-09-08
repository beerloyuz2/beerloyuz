import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function DELETE(
    req: Request,
) {
    try {

        const body = await req.json();
        const { id } = body

        if (!id) {
            return new NextResponse("Id is required", { status: 400 })
        }

        const order = await prismadb.order.delete({
            where: {
                id: id,
            }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.log('[ORDER_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};