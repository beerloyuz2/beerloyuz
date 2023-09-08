import getCurrentUser from "@/actions/getCurrentUser"
import Unauthorized from "@/components/Unauthorized"
import getCategories from "@/actions/getCategories"
import getColors from "@/actions/getColors"
import getModels from "@/actions/getModels"
import ProductForm from "../components/ProductForm"






const Page = async () => {

    const currentUser = await getCurrentUser()
    const categories = await getCategories()
    const colors = await getColors()
    const models = await getModels()

    if (currentUser?.admin === false || !currentUser) {
        return (
            <Unauthorized />
        )
    }

    return (
        <ProductForm
            categories={categories}
            colors={colors}
            models={models}

        />
    )
}

export default Page