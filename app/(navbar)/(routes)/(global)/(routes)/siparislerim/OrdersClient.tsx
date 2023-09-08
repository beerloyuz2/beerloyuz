"use client"

import CustomOrder from "@/components/Orders/CustomOrder"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Image, Order, Product, User } from "@prisma/client"

interface OrdersClientProps {
    currentUser?: User | null
    orders?: (Order & {
        product: Product & {
            images: Image[]
        }
        user: User
    })[] | null;
}


const OrdersClient = ({ currentUser, orders }: OrdersClientProps) => {

    const router = useRouter()



    if (!currentUser) {
        return (
            <div className=" pl-2 pt-[90px] w-full h-screen">
                <div>
                    <div className=" font-semibold">Siparişlerim</div>
                    <div className=" h-[70vh] w-full flex-col items-center justify-center flex sm:flex-row flex-wrap">
                        <div className=" font-thin ml-2 flex flex-col gap-4">
                            <p>Siparişlerinizi görebilmek için giriş yapınız.</p>
                            <Button variant="destructive" onClick={() => router.push("/girisyap")}>Giriş yap</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



    const confirmedOrders = () => {
        const confirmedO = orders?.filter((order) => order.confirmed === true)
        if (confirmedO?.length === 0) {
            return (
                <div className=" w-full text-center mt-10 text-xs md:text-sm lg:text-base">
                    <p>
                        Onaylanmış siparişiniz bulunmamaktadır.
                    </p>
                </div>
            )
        } else {
            return confirmedO?.map((order) => (
                <CustomOrder key={order.id} order={order} currentUser={currentUser} />
            ))
        }

    }
    const notConfirmedOrders = () => {
        const notConfirmedO = orders?.filter((order) => order.confirmed === false)
        if (notConfirmedO?.length === 0) {
            return (
                <div className=" w-full text-center mt-10 text-xs md:text-sm lg:text-base">
                    <p>
                        Onaylanmamış siparişiniz bulunmamaktadır.
                    </p>
                </div>
            )
        } else {
            return notConfirmedO?.map((order) => (
                <CustomOrder key={order.id} order={order} currentUser={currentUser} />
            ))
        }

    }


    return (
        <div className="w-full min-h-screen flex flex-col gap-4">
            <div className=" pl-2 pt-[90px] font-semibold flex items-center text-sm lg:text-base">
                <div>
                    {currentUser?.admin === true ? (
                        <p>Siparişlerim ({orders?.length}) <span className=" text-red-500">(Admin)</span></p>
                    ) : (
                        <p>Siparişlerim({orders?.length})</p>
                    )}
                </div>
            </div>
            <div className="h-full flex flex-col items-center">
                {orders?.length === 0 ? (
                    <div className="pl-2 font-thin w-full flex flex-col gap-10 items-center justify-center">
                        <p className=" self-start items-start">
                            Siparişiniz bulunmamaktadır.
                        </p>
                        <div className="">
                            <Button variant="premium" onClick={() => router.push("/urunlerimiz")}>
                                Alışverişe başla
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Tabs defaultValue="all" className="lg:min-w-[900px]">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all">Hepsi</TabsTrigger>
                            <TabsTrigger value="confirmed">Onaylanmış</TabsTrigger>
                            <TabsTrigger value="notConfirmed">Onaylanmamış</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            {orders?.map((order) => (
                                <CustomOrder key={order.id} order={order} currentUser={currentUser} />
                            ))}
                        </TabsContent>
                        <TabsContent value="confirmed">
                            {confirmedOrders()}
                        </TabsContent>
                        <TabsContent value="notConfirmed">
                            {notConfirmedOrders()}
                        </TabsContent>
                    </Tabs>

                )}
            </div>
        </div>
    )
}

export default OrdersClient