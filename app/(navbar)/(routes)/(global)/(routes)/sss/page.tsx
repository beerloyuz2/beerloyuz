import Breadcrumbs from "@/components/Breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { sss } from "@/constants"


const Page = () => {
  return (
    <div className='pt-[90px]'>
      <div className='w-full min-h-screen flex flex-col gap-2 items-center justify-center'>
        <Breadcrumbs href="/sss" name="Sıkça Sorulan Sorular" />
        <div className='flex max-w-[1200px] w-full min-h-screen'>
          <div className=" flex  flex-col w-full h-full">
            <div className=" w-full text-center my-4 text-2xl">
              Sıkça Sorulan Sorular (Örnek)
            </div>
            <Accordion type="single" collapsible className="w-full p-2">
              {sss.map((s, i) => (
                <AccordionItem  key={s.a} value={`item-${i}`}>
                  <AccordionTrigger className=" text-sm">{s.q}</AccordionTrigger>
                  <AccordionContent className=" text-xs">
                    {s.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page