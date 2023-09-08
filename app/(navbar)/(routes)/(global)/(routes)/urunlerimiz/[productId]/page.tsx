import getProductById from "@/actions/getProductById"
import ProductClient from "./components/ProductClient"
import getCurrentUser from "@/actions/getCurrentUser"
import getAllProducts from "@/actions/getAllProducts"

interface ProductPageProps {
    params: {
        productId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {

    const product = await getProductById(params.productId)
    const currentUser = await getCurrentUser()
    const products = await getAllProducts()

    if (!product) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
            <span className="font-light">Böyle bir ürün bulunmamaktadır.</span>
        </div>
        )
    }

    return (
        <ProductClient products={products} product={product} currentUser={currentUser} />
    )
}

export default ProductPage