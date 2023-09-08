import getCurrentUser from "@/actions/getCurrentUser"
import SignUpPageClient from "./components/SignUpPageClient"

const Page = async () => {

  const currentUser = await getCurrentUser()

  return (
    <SignUpPageClient currentUser={currentUser}  />
  )
}

export default Page