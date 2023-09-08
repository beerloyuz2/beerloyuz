import Breadcrumbs from '@/components/Breadcrumbs'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const Page = () => {
  return (
    <div className='pt-[90px]'>
      <div className='w-full min-h-screen flex flex-col gap-2 items-center justify-center'>
        <Breadcrumbs href='/surdurulebilirlik' name='Sürdürülebilirlik' />
        <div className='flex max-w-[1200px] w-full min-h-screen'>
          <div className=" flex  flex-col w-full h-full">
            <div className=" w-full my-4 text-2xl text-center">
              Sürdürülebilirlik (Örnek)
            </div>
            <Separator className=' my-4' />
            <p className=' text-sm text-muted-foreground flex flex-col gap-2'>
              <p>
                Firma olarak sürdürülebilirlik ilkelerini benimseme konusundaki kararlılığımızı yüksek bir öncelik olarak görüyoruz. Mobilya sektöründe, çevreye ve topluma olan sorumluluğumuzu en iyi şekilde yerine getirmek adına sürekli çaba gösteriyoruz. Bu bağlamda, ürünlerimizi tasarlarken ve üretirken çevreye duyarlı yaklaşımlar benimsemekteyiz.              </p>
              <p>
                Mobilya üretim süreçlerimizde çevre dostu malzemeler tercih ediyoruz. Bu, hem ürünlerimizin sağlamlığına katkıda bulunurken hem de üretim atıklarını minimuma indirgemeye yardımcı olur. Ürünlerimizin tasarımında dayanıklılık ve uzun ömür prensiplerini benimseyerek, tüketicilerimize uzun vadeli kullanım sağlayan ürünler sunmayı hedefliyoruz. Bu da atık miktarını azaltmada önemli bir rol oynar.
              </p>
              <p>
                Enerji verimliliği ve kaynak kullanımını sürekli olarak göz önünde bulunduruyoruz. Üretim tesislerimizi yenilenebilir enerji kaynaklarına geçiş için araştırıyor ve enerji tüketimimizi optimize etmek için en son teknolojileri kullanıyoruz. Ayrıca, tedarik zincirimizde yer alan malzemelerin çevresel etkilerini değerlendirerek, sürdürülebilir alternatiflere yönelme konusunda titizlikle çalışıyoruz.
              </p>
              <p>
                Ormanların sürdürülebilir yönetimi ve ormansızlaşmanın önlenmesi amacıyla ahşap tedarikimizi özenle seçiyoruz. Sertifikalı orman ürünlerini tercih ederek orman kaynaklarının korunmasına destek olmayı amaçlıyoruz. Ambalajlama ve taşıma süreçlerimizde plastik kullanımını en aza indirgeyerek, geri dönüştürülebilir ve çevre dostu ambalaj seçenekleri kullanarak karbon ayak izimizi minimize etmeye çalışıyoruz.
              </p>
              <p>
                Amacımız, sadece şu anki nesli değil, gelecek nesilleri de düşünerek sürdürülebilir bir geleceğe katkıda bulunmaktır. Müşterilerimize hem estetik hem de çevre dostu ürünler sunarak, günlük hayatlarını daha sürdürülebilir bir şekilde yönlendirmelerine yardımcı olmayı amaçlıyoruz. Sürdürülebilirlik vizyonumuz, iş yapma tarzımızın temel bir parçası olarak kalırken, sektörümüzde olumlu ve uzun ömürlü etkiler yaratma taahhüdümüzü sürdürüyoruz.
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page