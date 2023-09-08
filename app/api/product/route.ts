import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"


export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.error()
        }


        const body = await request.json()

        const { name, colors, categoryId, modelId, images, price } = body;

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if (!colors) {
            return new NextResponse("Colors are required", { status: 400 })
        }
        if (!categoryId) {
            return new NextResponse("Category Id is required", { status: 400 })
        }
        if (!modelId) {
            return new NextResponse("Model Id is required", { status: 400 })
        }
        if (!price) {
            return new NextResponse("Price  is required", { status: 400 })
        }


        const product = await prisma.product.create({
            data: {
                name: name.toLowerCase(),
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                },
                price,
                colors,
                categoryId,
                modelId,
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log("[PRODUCTS_POST]", error)
        return new NextResponse("Internal error", { status: 500 })
    }

}

export async function GET(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.error()
        }


        const products = await prisma.product.findMany({
            include: {
                category: true,
                model: true,
                images: true
            }
        })
        
        return NextResponse.json(products)
    } catch (error) {
        console.log("[PRODUCTS_GET]", error)
        return new NextResponse("Internal error", { status: 500 })
    }

}