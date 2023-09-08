import Breadcrumbs from "@/components/Breadcrumbs"
import { Mail, MapPin, Navigation, PhoneCall } from "lucide-react"


const Page = () => {
  return (
    <div className='pt-[90px]'>
      <div className='w-full min-h-screen flex flex-col gap-2 items-center justify-center'>
        <Breadcrumbs name="İletişim" href="/iletisim" />
        <div className='flex max-w-[1200px] w-full min-h-screen'>
          <div className=" flex  flex-col w-full h-full p-2">
            <div className=" w-full my-4 text-2xl text-center">
              İletişim (Örnek)
            </div>
            <div className=" flex flex-col gap-2 text-muted-foreground">
              <p>
                <span className=" text-xl text-primary inline-flex gap-x-2"><Navigation/>Adres:</span>  Örnek Mahallesi Atatürk Caddesi No:1234 Beşiktaş İstanbul
              </p>
              <p>
                <span className=" text-xl text-primary inline-flex gap-x-2"><PhoneCall/> Telefon:</span>  0212 789 45 67
              </p>
              <p>
                <span className=" text-xl text-primary inline-flex gap-x-2"><Mail/>E-Posta:</span>  beerloyuz@gmail.com
              </p>
              <p>
                <span className=" text-xl text-primary inline-flex gap-x-2"><MapPin/>Koordinat:</span>  41.04567890123456, 29.011223344556677
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page