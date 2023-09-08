import Breadcrumbs from '@/components/Breadcrumbs'
import { Separator } from '@/components/ui/separator'

const Page = () => {
  return (
    <div className='pt-[90px]'>
      <div className='w-full min-h-screen flex flex-col gap-2 items-center justify-center'>
        <Breadcrumbs name="Kısaca Biz" href="/kisacabiz" />
        <div className='flex max-w-[1200px] w-full min-h-screen'>
          <div className=" flex  flex-col w-full h-full">
            <div className=" w-full my-4 text-2xl text-center">
              Kısaca biz (Örnek)
            </div>
            <Separator className=' my-4' />
            <p className=' text-sm text-muted-foreground flex flex-col gap-2 p-2'>
              <p>
                Bir zamanlar, iş dünyasının hareketli manzarasında, tarihin sayfalarına kazınacak bir şirket ortaya çıktı. 20. yüzyılın başlarında kurulan bu şirketin ortaya çıkışı, dönemi tanımlayan yenilik ve girişimcilik ruhunun bir nişanesiydi. Vizyon sahibi bir liderin önderliğinde, küçük bir garajda mütevazı bir başlangıç olarak başladı ve insanların teknolojiyle etkileşim şeklini devrimleştirmek için büyük bir vizyonla beslendi.
              </p>
              <p>
                Bebeklik döneminde şirket, son teknoloji elektronikler geliştirmeye odaklandı ve yenilikçi ve güvenilir ürünler yaratma konusundaki ünü hızla yayıldı. Mükemmelliğe olan taahhüdü ve müşteri memnuniyeti, onu dikkate değer bir başarıya taşıdı. Yıllar geçtikçe, şirket teleteknoloji, bilgisayarlar ve tüketici elektroniğine giren çeşitli ürünler sunmaya başladı. Bu çeşitlendirme, şirketi hızla değişen bir pazarda adapte olmaya ve başarılı olmaya konumlandırdı.
              </p>
              <p>
                20. yüzyılın ortalarında, şirket dayanıklılığını test edecek birkaç zorlukla karşılaştı. Ekonomik daralmalar, teknolojik bozulmalar ve rakiplerden gelen şiddetli rekabet, ilerlemesini sekteye uğratma tehdidinde bulundu. Ancak şirketin değişen koşullara dayanma ve adapte olma yeteneği, onu bir sektör lideri olarak konumlandırdı.
              </p>
              <p>
                Dönüm noktası, şirketin 20. yüzyılın sonlarında dünyayı sonsuza dek değiştiren devrim niteliğindeki ürün serisini tanıttığı zamandı. Bireysel bireylere güç veren kişisel bilgisayarlardan aileleri bir araya getiren ev eğlence sistemlerine, şirketin yenilikleri günlük yaşamın ayrılmaz bir parçası haline geldi. Marka, yenilik ve kalite ile özdeşleşti ve ürünleri dünya çapında kült benzeri bir takipçi kitlesi kazandı.
              </p>
              <p>
                21. yüzyılın başlarında, şirket dijital hizmetler, bulut bilişim ve mobil cihazlara doğru başarılı bir yolculuğuna devam etti. Yeni pazarlara cesur adımlar atmak büyük ölçüde ödüllendi ve şirketi dünyanın en değerli ve etkili şirketlerinden biri olarak sağlamlaştırdı.
              </p>
              <p>
                Şirketin sürdürülebilirliğe ve etik uygulamalara olan bağlılığı aynı zamanda onu tanımlayan bir özellik haline geldi. Kurumsal sosyal sorumluluğu benimseyerek, birçok çevresel ve sosyal girişimi destekledi ve hizmet verdiği topluluklarda olumlu bir etki yarattı.
              </p>
              <p>
                Yıllar boyunca, şirket fırtınaları atlattı ve kilometre taşlarını kutladı. Yolculuğu, aksaklıklar ve tartışmalar olmadan geçmedi, ancak liderliği, inovasyon, dürüstlük ve insanların hayatlarında fark yaratma taahhüdünde kararlı kaldı.
              </p>
              <p>
                Zaman ilerledikçe, şirket yapay zeka, robotik ve artırılmış gerçeklik alanlarına yönelerek teknolojinin neyi başarabileceğinin sınırlarını zorladı. Diğer öncü kuruluşlarla işbirlikleri kurdu ve teknolojik ilerlemelerin öncüsü olabilmek için araştırma ve geliştirmeye büyük yatırımlar yaptı.
              </p>
              <p>
                Şirket, 21. yüzyılın üçüncü on yılına girdiğinde, inovasyon yapmaya, kökten değiştirmeye ve ilham vermeye devam etti. Ürünleri ve hizmetleri, sağlık, eğitim, eğlence ve ötesine uzanan endüstrilere ayrılmaz bir şekilde entegre olmuştu. Kıtalar arasında yayılmış ofisler ve tesislerle küresel bir konglomera haline gelmişti.
              </p>
              <p>
                Şirketin mirası sadece kârlar ve ödüllerle sınırlı değildi. Topluma katkıları derindi, teknolojik ilerlemenin yolunu şekillendiriyor ve milyarların yaşamını zenginleştiriyordu. Bir garajdaki mütevazı başlangıçlarından endüstri devi bir konuma gelene kadar, şirketin tarihi, vizyonun, kararlılığın ve yaratıcılığın gücünün bir nişanesiydi. Geleceğe baktığında, bu efsanevi şirketin, yenilik ve insanlığa olumlu etki yapmaya olan kararlılığıyla dünyayı dönüştürmede öncülük etmeye devam edeceğinden şüphe yoktu.
              </p>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Page