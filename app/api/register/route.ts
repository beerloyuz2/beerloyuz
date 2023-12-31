import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

export async function POST(
    request: Request
) {
    const body = await request.json()
    const { email, firstName, lastName, password, phone } = body;

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            hashedPassword,
            phone
        }
    })

    return NextResponse.json(user);
}