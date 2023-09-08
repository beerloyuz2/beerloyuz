"use client"

import { Category, Color, Model } from '@prisma/client';
import RootCarousel from "./RootCarousel"
import { SafeProduct } from "@/types"
import Marquee from 'react-fast-marquee';
import { sss, testimonials } from '@/constants';
import Testimonial from './Testimonial';
import { useEffect, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import HomeModal from '@/components/Modals/HomeModal';




export const RootPageClient = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [isHomeModalOpen, setIsHomeModalOpen] = useState(false)
  const router = useRouter()


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHomeModalOpen(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <HomeModal
        isOpen={isHomeModalOpen}
        onClose={() => setIsHomeModalOpen(false)}
      />
      <div className=' w-full'>
        <div className=" pt-[100px] w-full flex flex-col justify-center items-center gap-5">
          <RootCarousel />
          <div className=" w-full flex flex-col md:grid grid-cols-3 my-5  ">
            <div className=" p-5 relative min-h-[300px]  border-primary md:border-r-[1px] md:border-b-0 border-b-[1px] flex flex-col items-start gap-3 justify-center ">
              <div className=' font-extralight text-xl md:text-2xl  absolute top-6 left-5 tracking-wider'>
                ... YIL GARANTİ
              </div>
              <p className=' text-muted-foreground text-sm'>
                Beerloyuz, üretimden teslimata kadar titizlikle denetlenen üretimiyle öne çıkar. Her Beerloyuz kapağının arkasında, üretim tarihini ve Beerloyuz logosunu içeren lazerle işlenmiş işaretler bulunur. Üretim tarihinden itibaren kapaklarımız, sararma, solma ve aşınmalara karşı ... yıl garantilidir.
              </p>
            </div>
            <div className=" p-5 relative min-h-[300px] bg-secondary flex flex-col items-start gap-3 justify-center">
              <div className=' font-extralight text-xl md:text-2xl absolute top-6 left-5 tracking-wider'>
                ... İŞ GÜNÜNDE TESLİM
              </div>
              <p className=' text-muted-foreground text-sm'>

                Beerloyuz, günlük ...  üretim kapasitesiyle, sipariş tarihinden itibaren sadece ... iş günü içinde üretim yapar ve teslimatı uygun şekilde paketler. Siz siparişinizi verin, biz hızla teslim edelim.            </p>
            </div>
            <div className=" p-5 relative min-h-[300px] border-primary md:border-l-[1px] md:border-t-0 md:border-b-0 border-b-[1px] border-t-[1px] flex flex-col items-start gap-3 justify-center">
              <div className=' font-extralight text-xl md:text-2xl absolute top-6 left-5 tracking-wider'>
                ... YILIN GETİRDİĞİ TECRÜBE
              </div>
              <p className=' text-muted-foreground text-sm'>
                Beerloyuz, kuruluşundan bu yana sürekli gelişmeyi hedefleyen bir yolculuğa çıktı. Mobilya Kapakları üretimindeki .... yılımızı kutlarken, Türkiyenin önde gelen markalarından biri olmanın haklı gururunu yaşıyoruz.</p>
            </div>
          </div>
          <div className=' w-full flex flex-col gap-y-8'>
            <div className='w-full flex flex-col md:grid md:grid-cols-2'>
              <div className='min-h-[300px] flex flex-col gap-5 justify-center text-center md:text-left items-center md:items-start   p-10'>
                <h5 className=' text-xl md:text-2xl'>Modern Mutfağınıza Uygun Şık Mobilyalar</h5>
                <p className=' font-light text-muted-foreground md:max-w-sm'>Mutfak deneyiminizi en üst düzeye çıkarmak ve modern tarzınızı yansıtmak için tasarlanmış mobilyalarımızı keşfedin.</p>
                <ul>
                  <li className='flex gap-x-2'><Check width={20} /> Mutfağınıza özel tasarım seçenekleri</li>
                  <li className='flex gap-x-2'><Check width={20} />Dayanıklı malzeme kalitesi</li>
                  <li className='flex gap-x-2'><Check width={20} />Fonksiyonel depolama çözümleri</li>
                  <li className='flex gap-x-2'><Check width={20} />Estetik ve şık tasarımlar</li>
                </ul>
              </div>
              <div className='min-h-[400px] flex items-center justify-center' >
                <div className=' min-w-[250px] min-h-[250px] relative'>
                  <Image
                    fill
                    src="/image1.jpg"
                    alt='image1'
                    className=' rounded-lg shadow-md'
                  />
                </div>

              </div>
            </div>
            <Separator className=' bg-primary' />
            <div className='w-full flex flex-col-reverse md:grid md:grid-cols-2'>
              <div className='min-h-[300px] flex items-center justify-center' >
                <div className=' min-w-[250px] min-h-[250px] relative'>
                  <Image
                    fill
                    src="/image2.jpg"
                    alt='image1'
                    className=' rounded-lg shadow-md'
                  />
                </div>

              </div>
              <div className='min-h-[400px] flex flex-col gap-5 justify-center text-center md:text-right items-center md:items-end   p-10'>
                <h5 className=' text-xl md:text-2xl'>Klasik Estetiği Modern Konforla Birleştirin</h5>
                <p className=' font-light text-muted-foreground md:max-w-sm'>Geleneksel tasarımın sıcaklığını, modern fonksiyonelliği ile birleştiren mobilyalarımızı inceleyerek mutfaklarınızı güzelleştirin.</p>
                <ul>
                  <li className='flex gap-x-2 flex-row-reverse'><Check width={20} />Zamansız klasik detaylar</li>
                  <li className='flex gap-x-2 flex-row-reverse'><Check width={20} />Yüksek kaliteli ve dayanıklı malzemeler</li>
                  <li className='flex gap-x-2 flex-row-reverse'><Check width={20} />Geniş çalışma alanları</li>
                  <li className='flex gap-x-2 flex-row-reverse'><Check width={20} />Özgün ve karakteristik tasarımlar</li>
                </ul>
              </div>
            </div>
          </div>
          <Marquee speed={40} pauseOnClick>
            {testimonials.map((testimonial) => (
              <Testimonial key={testimonial.testimonial} testimonial={testimonial.testimonial} name={testimonial.name} occupation={testimonial.occupation} />
            ))}
          </Marquee>
          <div className=' w-full min-h-[400px] border flex items-center justify-center py-5'>
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-[550px] space-y-2 p-2"
            >
              <div className="flex items-center justify-between w-full">
                <h4 className="text-2xl font-semibold">
                  Sıkça Sorulan Sorular
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <Accordion type="single" collapsible className=' px-2'>
                {sss.slice(0, 3).map((s, i) => (
                  <AccordionItem key={s.a} value={`item-${i}`}>
                    <AccordionTrigger className=' text-sm'>{s.q}</AccordionTrigger>
                    <AccordionContent className='text-xs'>
                      {s.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <CollapsibleContent className="space-y-2 px-2">
                <Accordion className=' text-xs md:text-sm' type="single" collapsible>
                  {sss.slice(3, 5).map((s, i) => (
                    <AccordionItem key={s.a} value={`item-${i}`}>
                      <AccordionTrigger className=' text-sm'>{s.q}</AccordionTrigger>
                      <AccordionContent className=' text-xs'>
                        {s.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                  <div className=' w-full text-center my-4'>
                    Tamamını görmek için  <span onClick={() => router.push("/sss")} className=' hover:underline cursor-pointer font-semibold'>tıklayınız.</span>
                  </div>
                </Accordion>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className=" w-[95%] md:w-[80%] rounded-xl p-10  flex  items-center justify-center shadow-lg">
            <div className=' flex flex-col justify-between items-center text-center p-6 gap-6 w-[400px] sm:w-[500px]  md:w-[600px] rounded-2xl  '>
              <h2 className=' text-2xl sm:text-3xl md:text-5xl tracking-wider'>Hayalini Kurduğunuz Mutfak Sadece Bir Tık Uzağınızda!</h2>
              <p className=' text-sm md:text-lg'>Artık hayalini kurduğunuz mutfak, bir adım ötenizde. Alışverişe başlamak için hemen tıklayın, evinizin ruhunu yansıtan mobilyaları keşfedin. Siz de Beerloyuz ailesine katılın ve mutfaklarınıza değer katmanın keyfini yaşayın!</p>
              <div className=' pointer-events-auto select-auto cursor-pointer'>
                <Button variant="premium" size="sm" className=' p-3 text-[11px] sm:p-5 sm:text-[15px] lg:p-6 lg:text-[17px]  ' onClick={() => router.push("/urunlerimiz")}>
                  Alışverişe Başla
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
