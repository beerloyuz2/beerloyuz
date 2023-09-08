import prisma from "@/libs/prismadb"

export default async function getOrdersById(userId: string | undefined) {
    try {
        if (!userId) {
            return null
        }

        const orders = await prisma.order.findMany({
            where: {
                userId
            },
            include: {
                product: {
                    include: {
                        images: true
                    }
                },
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (!orders) {
            return null
        }

        return orders
    } catch (error: any) {
        throw new Error(error)
    }
}