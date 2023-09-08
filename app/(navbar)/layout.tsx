import Navbar from '@/components/Navbar/Navbar'
import '../globals.css'
import getCurrentUser from '@/actions/getCurrentUser'
import getOrdersById from '@/actions/getOrdersById'
import Footer from '@/components/Footer'


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()
  const orders = await getOrdersById(currentUser?.id)

  return (
    <>
        <Navbar currentUser={currentUser} orders={orders} />
        {children}
        <Footer/>
    </>
  )
}
