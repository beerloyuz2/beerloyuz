import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";


export async function DELETE(
    req: Request,
    { params }: { params: { modelId: string } }
) {
    try {


        const model = await prismadb.model.delete({
            where: {
                id: params.modelId,
            }
        });

        return NextResponse.json(model);
    } catch (error) {
        console.log('[MODEL_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { modelId: string } }
) {
    try {
        const body = await req.json()

        const { name } = body;

        const model = await prismadb.model.updateMany({
            where: {
                id: params.modelId,
            },
            data: {
                name
            }
        });

        return NextResponse.json(model);
    } catch (error) {
        console.log('[MODEL_UPDATE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};