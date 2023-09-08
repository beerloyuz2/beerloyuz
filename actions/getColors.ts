import prisma from "@/libs/prismadb"

export default async function getColors() {
    try {
        
        const colors = await prisma.color.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        })

        if (!colors) {
            return null
        }

        return colors
    } catch (error: any) {
        throw new Error(error)
    }
}