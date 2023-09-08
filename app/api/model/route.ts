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

        const { name } = body;

        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        const model = await prisma.model.create({
            data: {
                name: name
            }
        })
        
        return NextResponse.json(model)
    } catch (error) {
        console.log("[MODELS_POST]", error)
        return new NextResponse("Internal error", { status: 500 })
    }

}