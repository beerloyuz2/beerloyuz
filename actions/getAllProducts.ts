import prisma from "@/libs/prismadb"

export default async function getAllProducts() {
    try {

        const products = await prisma.product.findMany({
            include: {
                category: true,
                model: true,
                images: true
            }
            ,
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (!products) {
            return null
        }

        return products
    } catch (error: any) {
        throw new Error(error)
    }
}