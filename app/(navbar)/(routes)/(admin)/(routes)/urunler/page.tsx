import getCurrentUser from "@/actions/getCurrentUser"
import Unauthorized from "@/components/Unauthorized"
import getProducts from "@/actions/getAllProducts"
import ProductsClient from "./ProductsClient"





const Page = async () => {

    const currentUser = await getCurrentUser()
    const products = await getProducts()


    if (currentUser?.admin === false || !currentUser) {
        return (
            <Unauthorized />
        )
    }

    return (
        <ProductsClient products={products} />
    )
}

export default Page