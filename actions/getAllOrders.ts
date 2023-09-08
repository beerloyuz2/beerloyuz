import prisma from "@/libs/prismadb"

export default async function getAllOrders() {
    try {

        const orders = await prisma.order.findMany({
            include: {
                product: true,
                user: true
            },
            orderBy: {
                createdAt: "desc"
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