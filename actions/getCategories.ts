import prisma from "@/libs/prismadb"

export default async function getCategories() {
    try {
        
        const categories = await prisma.category.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                products: true
            }
        })

        if (!categories) {
            return null
        }


        return categories
    } catch (error: any) {
        throw new Error(error)
    }
}

