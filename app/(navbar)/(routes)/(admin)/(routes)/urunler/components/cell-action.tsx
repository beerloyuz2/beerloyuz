"use client"

import { Category, Image, Model, Product } from "@prisma/client"


import { useState } from "react"

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"


import { useRouter } from "next/navigation"
import NewProductsModal from "./NewProductsModal"

interface CellActionProps {
    data: Product & {
        category: Category
        model: Model
        images: Image[]
    }
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const router = useRouter();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)


    return (
        <>
            <NewProductsModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                product={data}
            />
            <ContextMenu>
                <ContextMenuTrigger className="absolute right-0 w-full h-full top-0">
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                    <ContextMenuItem onClick={() => router.push(`/urunler/${data.id}`)}>
                        Ürünü güncelle
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => setIsDeleteOpen(true)}>
                        Ürünü kaldır
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </>
    )
}