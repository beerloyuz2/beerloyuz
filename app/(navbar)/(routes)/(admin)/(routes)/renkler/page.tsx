import getCurrentUser from "@/actions/getCurrentUser"
import ColorsClient from "./ColorsClient"
import Unauthorized from "@/components/Unauthorized"
import getColors from "@/actions/getColors"




const Page = async () => {

    const currentUser = await getCurrentUser()
    const colors = await getColors()

    if (currentUser?.admin === false || !currentUser) {
        return (
            <Unauthorized/>
        )
    }

    return (
        <ColorsClient colors={colors}/>
    )
}

export default Page