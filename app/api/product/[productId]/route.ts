import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";


export async function DELETE(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {


        const product = await prismadb.product.delete({
            where: {
                id: params.productId,
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        const body = await req.json()

        const { name, colors, modelId, categoryId, images, price } = body;

        await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                images: {
                    deleteMany: {}
                },
                price,
                colors,
                modelId,
                categoryId,
            }
        });
        const product = await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_UPDATE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};