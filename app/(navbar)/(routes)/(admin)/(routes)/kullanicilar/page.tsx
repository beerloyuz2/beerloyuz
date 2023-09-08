import getCurrentUser from "@/actions/getCurrentUser"
import Unauthorized from "@/components/Unauthorized"
import AdminUsersClient from "./AdminUsersClient"
import getAllUsers from "@/actions/getAllUsers"




const Page = async () => {

    const currentUser = await getCurrentUser()
    const allUsers = await getAllUsers()

    if (currentUser?.admin === false || !currentUser) {
        return (
            <Unauthorized />
        )
    }

    return (

        <AdminUsersClient
            currentUser={currentUser}
            allUsers={allUsers}
        />
    )
}

export default Page