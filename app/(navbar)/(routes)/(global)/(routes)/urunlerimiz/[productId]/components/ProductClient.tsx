"use client"

import NewShopModal from "@/components/Modals/NewShopModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import 'react-photo-view/dist/react-photo-view.css';
import { Category,  Image as Img, Model, Product, User } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoLogoWhatsapp } from "react-icons/io"
import Breadcrumbs from "@/components/Breadcrumbs"
import DragCarousel from "@/components/DragCarousel"
import { PhotoProvider, PhotoView } from "react-photo-view"
import { images } from "@/constants";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";


interface ProductClientProps {
    product: Product & {
        category: Category
        model: Model
        images: Img[]
    }
    products: (Product & {
        category: Category
        model: Model
        images: Img[]
    })[] | null
    currentUser: User | null
}



const ProductClient = ({ product, currentUser, products }: ProductClientProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleOrder = () => {
        if (currentUser) {
            return setIsOpen(true)
        }

        router.push("/girisyap")
    }


    return (
        <>
            <NewShopModal
                product={product}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                Add
            />
            <div className="pt-[90px] w-full min-h-screen ">
                <div className=" flex flex-col w-full min-h-screen gap-y-5  justify-center items-center">
                    <Breadcrumbs href="/urunlerimiz" name="Ürün" />
                    <div className="max-w-[1200px] w-[95%] md:w-[90%] flex flex-col gap-y-2 md:grid md:grid-cols-2 gap-x-2  ">
                        <div className="relative min-h-[500px] md:min-h-[600px]">
                            <PhotoProvider>
                                {product.images.length > 1 ? (
                                    <>
                                        <div className=" relative min-h-[400px] md:min-h-[500px]">
                                            <PhotoView src={product.images[0].url}>
                                                <Image
                                                    alt={product.name}
                                                    fill
                                                    src={product.images[0].url}
                                                    style={{ objectFit: "cover", borderRadius: "5px", cursor: "pointer" }}
                                                />
                                            </PhotoView>
                                        </div>
                                        <div className=" absolute bottom-0 h-[100px] w-full flex p-[10px] gap-4">
                                            {product.images.slice(1, images.length).map((img: Img) => (
                                                <div key={img.url} className=" relative h-[90px] w-[90px] ">
                                                    <PhotoView src={img.url}>
                                                        <Image
                                                            alt={img.url}
                                                            fill
                                                            src={img.url}
                                                            style={{ objectFit: "cover", borderRadius: "5px", cursor: "pointer" }}
                                                        />
                                                    </PhotoView>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className=" relative min-h-[500px] md:min-h-[600px]">
                                            <PhotoView src={product.images[0].url}>
                                                <Image
                                                    alt={product.name}
                                                    fill
                                                    src={product.images[0].url}
                                                    style={{ objectFit: "cover", borderRadius: "5px", cursor: "pointer" }}
                                                />
                                            </PhotoView>
                                        </div>
                                )}

                            </PhotoProvider>
                        </div>
                        <Card className="min-h-[500px] md:min-h-[600px] w-full bg-secondary/50 border-0">
                            <CardHeader className=" text-center">
                                <div className=" text-5xl font-bold m-2">
                                    {product?.name.toUpperCase()}
                                </div>
                            </CardHeader>
                            <CardContent className=" m-2 flex flex-col gap-y-6">
                                <div>
                                    <span className=" font-bold text-3xl">KATEGORİ:    </span>    {product?.category.name}
                                </div>
                                <div>
                                    <span className=" font-bold text-3xl">MODEL:    </span>     {product?.model.name}
                                </div>
                                <div>
                                    <span className=" font-bold text-3xl">M² FİYATI:   </span>     {product?.price}TL
                                </div>
                                <div>
                                    {product.colors.length > 1 ? (
                                        <div className=" flex gap-2">
                                            <span className=" font-bold text-3xl">RENKLER:   </span>
                                            <Select>
                                                <SelectTrigger className="w-[180px] bg-secondary text-primary">
                                                    <SelectValue placeholder="Renk seçenekleri" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {product.colors.map((color) => (
                                                            <SelectItem key={color} value={color}>{color}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                    ) : (
                                        <div>
                                            <span className=" font-bold text-3xl">RENK:   </span>     {product?.colors.toString()}
                                        </div>
                                    )}

                                </div>
                                <div>
                                    <Button variant="premium" onClick={() => handleOrder()}>
                                        Sipariş ver
                                    </Button>
                                </div>
                                <div>
                                    <Button className="flex gap-x-2" onClick={() => { router.push(`https://api.whatsapp.com/send?phone=+905433377233&text=${product?.name}%20bu%20urun%20hakkinda%20bilgi%20almak%20istiyorum.`) }}>
                                        <IoLogoWhatsapp />
                                        Whatsapp Bilgi
                                    </Button>
                                </div>
                            </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <DragCarousel ssr products={products} />
            </div>
        </>
    )
}

export default ProductClient