import getCurrentUser from "@/actions/getCurrentUser"
import ModelsClient from "./ModelsClient"
import getModels from "@/actions/getModels"
import Unauthorized from "@/components/Unauthorized"




const Page = async () => {

    const currentUser = await getCurrentUser()
    const models = await getModels()

    if (currentUser?.admin === false || !currentUser) {
        return (
            <Unauthorized/>
        )
    }

    return (
        <ModelsClient models={models}/>
    )
}

export default Page