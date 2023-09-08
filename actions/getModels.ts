import prisma from "@/libs/prismadb"

export default async function getModels() {
    try {

        const models = await prisma.model.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                products: true
            }
        })

        if (!models) {
            return null
        }

        return models
    } catch (error: any) {
        throw new Error(error)
    }
}