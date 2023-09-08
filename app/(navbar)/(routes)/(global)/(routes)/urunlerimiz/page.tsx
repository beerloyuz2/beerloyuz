
import getCategories from '@/actions/getCategories'
import getModels from '@/actions/getModels'
import Filter from './components/Filter'
import getFilteredProducts from '@/actions/getFilteredProducts'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Product from './components/Product'

interface ProductsPageProps {
  searchParams: {
    categoryId: string;
    modelId: string;
    name: string
  }
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {

  const categories = await getCategories()
  const models = await getModels()
  const products = await getFilteredProducts({
    name: searchParams.name,
    categoryId: searchParams.categoryId,
    modelId: searchParams.modelId
  })

  return (
    <div className='pt-[90px]'>
      <div className='w-full min-h-screen flex flex-col gap-5 items-center justify-center'>
        <Breadcrumbs href='/urunlerimiz' name='Ürünlerimiz' />
        <div className='flex max-w-[1250px] w-full min-h-screen px-4'>
          <div className=' hidden mr-2 md:flex flex-col gap-3 w-[300px] sticky'>
            <Filter
              valueKey="categoryId"
              name="Kategoriler"
              data={categories}
            />
            <Filter
              valueKey="modelId"
              name="Modeller"
              data={models}
            />
          </div>
          <div className='  flex flex-col w-full'>
            <div className=' mb-2 min-h-[40px] flex justify-between items-center'>
              <span className=' font-semibold tracking-wide pl-2'>Beerloyuz Kapak ürünleri</span>
              <div className=' flex gap-2 items-center justify-center'>
                <Link href="/urunlerimiz">
                  <Button variant="destructive">Filtreleri kaldır</Button>
                </Link>
                <Sheet>
                  <SheetTrigger className='md:hidden' asChild>
                    <Button variant="default">Filtre ekle</Button>
                  </SheetTrigger>
                  <SheetContent className=' md:hidden'>
                    <SheetHeader className='mb-2'>
                      <SheetTitle>Filtre ekle</SheetTitle>

                    </SheetHeader>
                    <Filter
                      valueKey="categoryId"
                      name="Kategoriler"
                      data={categories}
                    />
                    <Filter
                      valueKey="modelId"
                      name="Modeller"
                      data={models}
                    />
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button type="submit">Değişiklikleri Kaydet</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>

            </div>
            <Separator className=' md:hidden my-4' />
            <div className=' h-auto w-full'>
              <div className=' w-full grid grid-cols-2 md:grid-cols-3 gap-2 '>
                {products?.length === 0 && (
                  <div className=' p-2'>
                    Böyle bir ürün bulunmamaktadır.
                  </div>
                )}
                {products?.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage