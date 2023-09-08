import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";


export async function DELETE(
    req: Request,
    { params }: { params: { colorId: string } }
) {
    try {


        const color = await prismadb.color.delete({
            where: {
                id: params.colorId,
            }
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log('[COLOR_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { colorId: string } }
) {
    try {
        const body = await req.json()

        const { name } = body;

        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId,
            },
            data: {
                name
            }
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log('[COLOR_UPDATE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};