import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";


export async function DELETE(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {


        const category = await prismadb.category.delete({
            where: {
                id: params.categoryId,
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        const body = await req.json()

        const { name } = body;

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data: {
                name
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_UPDATE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};