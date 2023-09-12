"use client"

import { useState } from "react"
import { fullOrder } from "@/types"
import NewShopModal from "@/components/Modals/NewShopModal"
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Order, Product, User } from "@prisma/client"


interface CellActionProps {
    data: Order & {
        product: Product
        user: User
    }
}


export const CellAction: React.FC<CellActionProps> = ({ data }) => {


    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)





    return (
        <>
            <NewShopModal
                order={data}
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                Delete

            />
            <NewShopModal
                order={data}
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                Update

            />
            <NewShopModal
                order={data}
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                Confirm

            />
            <ContextMenu>
                <ContextMenuTrigger className=" absolute right-0 w-full h-full top-0 z-0">
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                    <ContextMenuItem inset disabled={data.confirmed} onClick={() => setIsUpdateOpen(true)}>
                        Güncelle {data.confirmed && "(Onaylandı)"}
                    </ContextMenuItem>
                    <ContextMenuItem inset onClick={() => setIsDeleteOpen(true)}>
                        {data.confirmed ? "Kaldır" : "İptal et"}
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuCheckboxItem checked={data.confirmed} disabled={data.confirmed} onClick={() => setIsConfirmOpen(true)} >
                        {data.confirmed ? "Onaylandı" : "Onayla"}
                    </ContextMenuCheckboxItem>

                </ContextMenuContent>
            </ContextMenu>
        </>
    )
}