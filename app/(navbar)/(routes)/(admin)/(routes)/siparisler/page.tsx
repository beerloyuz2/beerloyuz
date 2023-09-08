import getCurrentUser from "@/actions/getCurrentUser"
import getAllOrders from "@/actions/getAllOrders"

import Unauthorized from "@/components/Unauthorized"
import AdminOrdersClient from "./AdminOrdersClient"




const Page = async () => {

    const currentUser = await getCurrentUser()
    const allOrders = await getAllOrders()

    if (currentUser?.admin === false || !currentUser) {
        return (
            <Unauthorized />
        )
    }

    return (
        <AdminOrdersClient
            currentUser={currentUser}
            allOrders={allOrders}
        />
    )
}

export default Page