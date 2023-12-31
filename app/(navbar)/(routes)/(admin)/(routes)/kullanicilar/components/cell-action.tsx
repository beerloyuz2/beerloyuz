"use client"

import { Order, User } from "@prisma/client"


import { useState } from "react"

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface CellActionProps {
    data: User & {
        orders: Order[]
    }
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter();
    

    const authorize = () => {
        setIsLoading(true);

        axios.patch(`/api/user/authorize/${data.id}`).then(() => {
            toast({
                variant: "default",
                title: "Yetki verildi!"
            })
            router.refresh()
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Bir şeyler yanlış gitti."
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }
    const unAuthorize = () => {
        setIsLoading(true);

        axios.patch(`/api/user/unauthorize/${data.id}`).then(() => {
            toast({
                variant: "default",
                title: "Yetki alındı!"
            })
            router.refresh()
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: data.email === "beerloyuz@gmail.com" ? "beerloyuz'un yetkisini alamazsın." : "Bir şeyler yanlış gitti." 
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger className="absolute right-0 w-full h-full top-0">
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                    {data.admin === true ? (
                        <ContextMenuItem disabled={isLoading} onClick={() => unAuthorize()}>
                            Yetkiyi kaldır
                        </ContextMenuItem>
                    ) : (
                        <ContextMenuItem disabled={isLoading} onClick={() => authorize()}>
                            Yetki ver
                        </ContextMenuItem>
                    )}
                    <ContextMenuItem disabled>
                        Sipariş sayısı: {data.orders.length}
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </>
    )
}