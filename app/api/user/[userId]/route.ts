import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import bcrypt from "bcrypt"


export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {


        const body = await req.json()

        const { firstName, lastName, oldPassword, newPassword, avatarUrl, phone } = body;

        const currentUser = await getCurrentUser()

        if (!currentUser || currentUser?.id !== params.userId) {
            return NextResponse.error()
        }

        const selectedUser = await prismadb.user.findUnique({
            where: {
                id: params.userId
            }
        })

        if (!selectedUser || !selectedUser?.hashedPassword) {
            throw new Error("No user found.")
        }






        if (newPassword) {

            const isCorrectPassword = await bcrypt.compare(
                oldPassword,
                selectedUser.hashedPassword
            );

            if (!isCorrectPassword) {
                throw new Error("Invalid credentials")
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12)

            const user = await prismadb.user.update({
                where: {
                    id: params.userId,
                },
                data: {
                    hashedPassword
                }
            });

            return NextResponse.json(user);
        } else {
            const user = await prismadb.user.update({
                where: {
                    id: params.userId,
                },
                data: {
                    firstName,
                    lastName,
                    avatarUrl,
                    phone
                }
            });
            return NextResponse.json(user);
        }
    } catch (error) {
        console.log('[PROFILE_UPDATE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};