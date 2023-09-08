import getCurrentUser from "@/actions/getCurrentUser"
import LoginPageClient from "./components/LoginPageClient"





const Page = async () => {

  const currentUser = await getCurrentUser()

  return (
    <LoginPageClient currentUser={currentUser} />
  )
}

export default Page