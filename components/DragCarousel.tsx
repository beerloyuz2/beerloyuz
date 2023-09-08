
import { SafeProduct } from '@/types';
import { Category, Color, Image as Img, Model, Product } from '@prisma/client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { ArrowLeft } from 'lucide-react';

interface DragCarouselProps {
    products: (Product & {
        category: Category
        model: Model
        images: Img[]
    })[] | null
    ssr: boolean
}

const DragCarousel = ({ products, ssr }: DragCarouselProps) => {

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        largeDesktop: {
            breakpoint: { max: 3000, min: 1280 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1280, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1
        }
    };

    if(products?.length === 1) {
        return <div></div>
    }

    return (
        <div>
            <div className='flex flex-col gap-y-4 m-4'>
                <Separator />
                <div className=' font-bold text-4xl'>
                    Beerloyuz
                    <p className=' text-muted-foreground text-2xl font-light'>
                        Ürünlerimiz
                    </p>
                </div>

                <Carousel responsive={responsive} ssr={ssr} draggable autoPlay autoPlaySpeed={3000} className=' my-4' swipeable>
                    {products?.map((product) => (
                        <Card key={product.id} className=' pointer-events-none mx-4 max-w-[350px] select-none'>
                            <CardTitle className=" relative h-[280px]  inset-0 cursor-pointer ">
                                <Link href={`/urunlerimiz/${product.id}`}>
                                    <Image
                                        alt={product.name}
                                        src={product.images[0].url}
                                        fill
                                        style={{ objectFit: "cover", borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}

                                    />
                                </Link>
                            </CardTitle>
                            <CardContent className=" p-2">
                                <div className=" font-bold">
                                    {product.name.toUpperCase()}
                                </div>
                                <div className=" text-red-500 font-semibold">
                                    {product.category.name}
                                </div>
                                <div className=" font-light">
                                    Model: {product.model.name}, Kalınlık: 18mm
                                </div>
                            </CardContent>
                            <CardFooter className=" w-full flex items-center justify-center">
                                <Link href={`/urunlerimiz/${product.id}`} className=' w-full pointer-events-auto'>
                                    <Button variant="destructive" className="w-full">
                                        İncele
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default DragCarousel
