"use client"


import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import { useTheme } from "next-themes"
import { Button } from '@/components/ui/button';
import Carousel, { ArrowProps } from 'react-multi-carousel';
import { cn } from '@/libs';
import { images } from '@/constants';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';



const RootCarousel = () => {

    const { theme } = useTheme()
    const router = useRouter()

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        largeDesktop: {
            breakpoint: { max: 3000, min: 1280 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 1280, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1
        }
    };


    const CustomLeftArrow = ({ onClick }: ArrowProps) => {
        return (
            <button className=' absolute transition p-3 hover:bg-black hover:bg-opacity-30  text-white' onClick={onClick}>
                <ArrowLeft size={30} />
            </button>
        )
    }

    const CustomRightArrow = ({ onClick }: ArrowProps) => {
        return (
            <button className=' absolute right-0 transition p-3 hover:bg-black hover:bg-opacity-30  text-white' onClick={onClick}>
                <ArrowRight size={30} />
            </button>
        )
    }




    return (
        <div className='relative w-full'>
            <Carousel responsive={responsive} customRightArrow={<CustomRightArrow />} customLeftArrow={<CustomLeftArrow />} rewind rewindWithAnimation draggable swipeable autoPlay autoPlaySpeed={4000}>
                {images.map((image) => (
                    <div key={image.heading} className='relative w-full h-[50vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] xl:h-[90vh] border flex items-center justify-center pointer-events-none select-none '>
                        <div className={cn("w-[60%] h-[200px] md:h-[300px] xl:h-[400px] rounded-[30px] absolute flex flex-col items-center justify-center z-50 blur-3xl", theme === "light" ? "bg-white opacity-70" : "bg-black opacity-50")}>
                        </div>
                        <div className=' flex flex-col justify-between items-center text-center p-6  gap-6 h-[200px] sm:h-[300px] md:h-[350px] w-[400px] sm:w-[500px]  md:w-[600px] rounded-2xl  z-50'>
                            <h2 className=' text-2xl sm:text-3xl md:text-5xl tracking-wider'>{image.heading} </h2>
                            <p className=' text-sm md:text-lg'> {image.message} </p>
                            <div className=' pointer-events-auto select-auto cursor-pointer z-50'>
                                <Button variant="premium" size="sm" className=' p-3 text-[11px] sm:p-5 sm:text-[15px] lg:p-6 lg:text-[17px]  ' onClick={() => router.push(image.callToActionHref)}>
                                    {image.callToAction}
                                </Button>
                            </div>

                        </div>
                        <Image
                            src={image.href}
                            alt='image'
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default RootCarousel
