import getCurrentUser from "@/actions/getCurrentUser"
import CategoriesClient from "./CategoriesClient"
import getCategories from "@/actions/getCategories"
import Unauthorized from "@/components/Unauthorized"




const Page = async () => {

    const currentUser = await getCurrentUser()
    const categories = await getCategories()

    if (currentUser?.admin === false || !currentUser) {
        return (
            <Unauthorized/>
        )
    }

    return (
        <CategoriesClient categories={categories}/>
    )
}

export default Page