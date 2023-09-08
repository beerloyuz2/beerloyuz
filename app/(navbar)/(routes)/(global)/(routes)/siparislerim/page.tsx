import getCurrentUser from "@/actions/getCurrentUser"
import OrdersClient from "./OrdersClient"
import getOrdersById from "@/actions/getOrdersById"





const Page = async () => {

    const currentUser = await getCurrentUser()
    const orders = await getOrdersById(currentUser?.id)

    return (
        <OrdersClient orders={orders} currentUser={currentUser} />
    )
}

export default Page