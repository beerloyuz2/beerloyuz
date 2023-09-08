"use client"


import { useState } from "react";
import { Image as Img, Order, Product, User } from "@prisma/client"
import {  RotateCcw } from "lucide-react";
import NewShopModal from "../Modals/NewShopModal";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/navigation";
import { cn, dateFormatter } from "@/libs";



interface CustomOrderProps {
    order: Order & {
        product: Product & {
            images: Img[]
        }
        user: User
    }
    currentUser: User
}

const CustomOrder: React.FC<CustomOrderProps> = ({ order, currentUser }) => {

    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const router = useRouter()

    return (
        <>
            <NewShopModal
                order={order}
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                Delete

            />
            <NewShopModal
                order={order}
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                Update

            />
            <Card className=" m-3 my-6">
                <CardHeader className=" bg-secondary text-[10px] md:text-xs lg:text-base rounded-t-md h-[60px] lg:h-[80px] flex flex-row items-center justify-center gap-10">
                    <div className=" flex flex-col text-center">
                        <p>Sipariş Tarihi</p>
                        <p className=" text-muted-foreground">{dateFormatter.format(order.createdAt)}</p>
                    </div>
                    <div className=" flex flex-col text-center">
                        <p>Toplam Fiyat</p>
                        <p className=" text-muted-foreground">{order.totalPrice}TL</p>
                    </div>
                    <div className=" flex flex-col text-center">
                        <p>Adet Fiyatı</p>
                        <p className=" text-muted-foreground">{order?.price}TL / {order.amount} Adet </p>
                    </div>
                </CardHeader>
                <CardContent className=" w-full lg:min-w-[900px] py-3">
                    <div className=" px-3 sm:px-4 md:px-5 lg:px-6 flex flex-row justify-between">
                        <div className=" flex flex-row justify-center items-center gap-5">
                                <div className=" relative w-24 h-24 md:h-32 md:w-32 lg:w-40 lg:h-40 cursor-pointer" onClick={() => router.push(`/urunlerimiz/${order?.productId}`)}>
                                    <Image
                                        src={order.product.images[0].url}
                                        fill
                                        className="object-cover"
                                        alt="sipariş"
                                    />
                                    {order.amount !== 1 && (
                                        <div className={cn("rounded-full absolute -bottom-2 -right-2 flex items-center font-bold justify-center bg-primary text-secondary text-xs", order.amount.toString().length > 2 ? "w-7 h-7" : " w-5 h-5")}>
                                            {order.amount}
                                        </div>
                                    )}

                                </div>
                            <div className=' flex flex-col items-start gap-1 p-1 text-[8px] md:text-xs lg:text-base justify-start'>
                                <p className=" font-bold">{order?.product.name.toUpperCase()}</p>
                                <p> <span className=' font-semibold'>Boy:</span>  <span className=" text-muted-foreground">{order?.height}mm</span> </p>
                                <p> <span className=' font-semibold'>En:</span>  <span className=" text-muted-foreground">{order?.width}mm</span> </p>
                                <p> <span className=' font-semibold'>Renk:</span>  <span className=" text-muted-foreground">{order?.color}</span> </p>
                                <p> <span className=' font-semibold'>Durum:</span>  <span className=" text-muted-foreground"></span>{order?.confirmed === true ? <span className=" text-green-600">Onaylandı ({dateFormatter.format(order.updatedAt)})</span> : <span className=" text-red-600">Onaylanmadı</span>} </p>
                                {order?.other !== "" && (
                                    <p> <span className=' font-semibold'>Taleplerim:</span> {order?.other?.length! > 10 ? (<Button variant="secondary" className="text-[10px] md:text-xs lg:text-bas" size="sm2">
                                        <Popover>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <PopoverTrigger>
                                                            {order?.other?.substring(0, 6) + "..."}
                                                        </PopoverTrigger>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        Tamamını görmek için tıklayınız.
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <PopoverContent>
                                                {order?.other}
                                            </PopoverContent>
                                        </Popover>

                                    </Button>) : order?.other}</p>
                                )}
                            </div>
                        </div>
                        <div className=" flex flex-col items-center gap-3 justify-center">
                            {!order.confirmed && (
                                <Button variant="secondary"  onClick={() => setIsUpdateOpen(true)} className="text-[8px] md:text-[10px] lg:text-sm w-22 h-6 md:w-24 md:h-8 lg:w-32 lg:h-10 px-2 ">
                                    Siparişi güncelle
                                </Button>
                            )}

                            {!order.confirmed && (
                                <Button  variant="destructive" onClick={() => setIsDeleteOpen(true)} className="text-[8px] md:text-[10px] lg:text-sm w-22 h-6 md:w-24 md:h-8 lg:w-32 lg:h-10 px-2 ">
                                    Siparişi iptal et
                                </Button>
                            )}
                            {order.confirmed && currentUser.admin === true && (
                                <Button onClick={()=> setIsDeleteOpen(true)}  variant="destructive" className="text-[8px] md:text-[10px] lg:text-sm w-22 h-6 md:w-24 md:h-8 lg:w-32 lg:h-10 px-2 ">
                                    Siparişi kaldır
                                </Button>
                            )}
                            {order.confirmed && currentUser.admin === false && (
                                    <Button variant="outline" className="text-[8px] md:text-[10px] lg:text-sm w-22 h-6 md:w-24 md:h-8 lg:w-32 lg:h-10 px-2 " onClick={() => router.push(`/urunlerimiz/${order?.productId}`)}>
                                        <RotateCcw className="w-4 h-4 mr-1" /> <span> Tekrardan Satın al</span>
                                    </Button>
                            )}

                        </div>
                    </div>


                </CardContent>
            </Card>
        </>
    )
}

export default CustomOrder