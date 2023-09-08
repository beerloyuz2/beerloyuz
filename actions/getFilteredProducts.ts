import prisma from "@/libs/prismadb"


interface Query {
    categoryId?: string;
    modelId?: string;
    name?: string
}

export default async function getFilteredProducts(query: Query) {
    try {



        const products = await prisma.product.findMany({
            where: {
                name: query.name?.toLowerCase(),
                categoryId: query.categoryId,
                modelId: query.modelId
            },

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