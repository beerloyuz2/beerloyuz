import prisma from "@/libs/prismadb"

export default async function getProductById(id: string) {
    try {

        const product = await prisma.product.findUnique({
            where: {
                id
            },
            include: {
                images: true,
                category: true,
                model: true
            }
        })

        if (!product) {
            return null
        }

        return product
    } catch (error: any) {
        throw new Error(error)
    }
}