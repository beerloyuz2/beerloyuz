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

        const color = await prisma.color.create({
            data: {
                name: name
            }
        })
        return NextResponse.json(color)
    } catch (error) {
        console.log("[COLORS_POST]", error)
        return new NextResponse("Internal error", { status: 500 })
    }

}