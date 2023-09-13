import getCurrentUser from "@/actions/getCurrentUser"
import ProfilePageClient from "./components/ProfilePageClient"
import { redirect } from "next/navigation"


const ProfilePage = async () => {

  const currentUser = await getCurrentUser()

  if(!currentUser) {
    return redirect("/girisyap")
  }
  
  return (
    <ProfilePageClient currentUser={currentUser}/>
  )
}

export default ProfilePage