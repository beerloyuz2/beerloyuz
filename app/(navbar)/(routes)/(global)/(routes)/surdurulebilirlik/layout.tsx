import '@/app/globals.css'



export const metadata = {
  title: 'beerloyuz.com - Sürdürülebilirlik',
  description: 'Generated by beerloyuz',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <>
        {children}
    </>
  )
}
