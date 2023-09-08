import getCurrentUser from "@/actions/getCurrentUser"
import ProfilePageClient from "./components/ProfilePageClient"


const ProfilePage = async () => {

  const currentUser = await getCurrentUser()


  
  return (
    <ProfilePageClient currentUser={currentUser}/>
  )
}

export default ProfilePage