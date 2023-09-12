import getCurrentUser from "@/actions/getCurrentUser"
import Unauthorized from "@/components/Unauthorized"
import getCategories from "@/actions/getCategories"
import getColors from "@/actions/getColors"
import getModels from "@/actions/getModels"
import ProductForm from "../components/ProductForm"
import getProductById from "@/actions/getProductById"






const Page = async ({ params }: { params: { productId: string } }) => {

    const currentUser = await getCurrentUser()
    const product = await getProductById(params.productId)
    const categories = await getCategories()
    const colors = await getColors()
    const models = await getModels()

    if (currentUser?.admin === false || !currentUser) {
        return (
            <Unauthorized />
        )
    }
    if (!product || product === null) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <span className="font-light">Böyle bir ürün bulunmamaktadır.</span>
            </div>
        )
    }

    return (
        <ProductForm
            product={product}
            categories={categories}
            colors={colors}
            models={models}

        />
    )
}

export default Page