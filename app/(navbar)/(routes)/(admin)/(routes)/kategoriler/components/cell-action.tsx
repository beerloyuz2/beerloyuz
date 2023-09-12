"use client"

import { useEffect, useState } from "react"
import { SafeCategory } from "@/types"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"
import NewCategoriesModal from "./NewCategoriesModal"
import { useRouter } from "next/navigation"
import { Category, Product } from "@prisma/client"


interface CellActionProps {
    data: Category & {
        products: Product[]
    }
}


export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const router = useRouter()
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)


    return (
        <>
            <NewCategoriesModal
                category={data}
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                Update
            />
            <NewCategoriesModal
                category={data}
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                Delete
            />
            <ContextMenu>
                <ContextMenuTrigger className=" absolute right-0 w-full h-full top-0 z-0">
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                    <ContextMenuItem onClick={() => setIsUpdateOpen(true)}>
                        Güncelle
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => setIsDeleteOpen(true)}>
                        Kaldır
                    </ContextMenuItem>
                    {data.products.length > 0 && (
                        <>
                            <ContextMenuSeparator />
                            <ContextMenuLabel>Kullanılan Ürünler</ContextMenuLabel>
                            <ContextMenuSeparator />
                            {data.products.map((product: Product) => (
                                <ContextMenuItem key={product.id} onClick={() => router.push(`/urunlerimiz/${product.id}`)}>
                                    {product.name}
                                </ContextMenuItem>
                            ))}

                        </>
                    )}
                </ContextMenuContent>
            </ContextMenu>
            <div>
                {data.products.length}
            </div>
        </>
    )
}