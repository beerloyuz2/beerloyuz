import prisma from "@/libs/prismadb"

export default async function getAllUsers() {
    try {

        const users = await prisma.user.findMany({
            include: {
                orders: true
            }
        })

        if (!users) {
            return null
        }


        return users
    } catch (error: any) {
        throw new Error(error)
    }
}