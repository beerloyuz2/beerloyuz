"use client"

import { useEffect, useState } from "react"

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"


import { useTheme } from "next-themes"
import NewColorsModal from "./NewColorsModal"
import { Color } from "@prisma/client"
import axios from "axios"
import { PulseLoader } from "react-spinners"




interface CellActionProps {
    data: Color
}


export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [products, setProducts] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const { theme } = useTheme()

    useEffect(() => {
        axios.get(`/api/product`).then((res) => {
            const products = res.data;
            let stringColors: any = undefined;
            products.map((product: any) => {
                if (stringColors === undefined) return stringColors = product.colors.toString()
                return stringColors = stringColors + "," + product.colors.toString()
            })

            const productCount = stringColors.split(",").filter((stringColor: string) => stringColor === data.name)
            setProducts(productCount.length)
        }).catch(() => {

        }).finally(() => {
            setIsLoading(false)
        })
    }, [data.name])

    if (isLoading) return <PulseLoader color={theme === "light" ? "black" : "white"} size={5} />



    return (
        <>
            <NewColorsModal
                color={data}
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                Update
            />
            <NewColorsModal
                color={data}
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
                    {products === 0 ? (
                        <ContextMenuItem onClick={() => setIsDeleteOpen(true)}>
                            Kaldır
                        </ContextMenuItem>
                    ) : (
                        <ContextMenuItem disabled>
                            Silebilmek için kullandığınız ürünleri silin.
                        </ContextMenuItem>
                    )}

                </ContextMenuContent>
                <div>
                    {products}
                </div>
            </ContextMenu>
        </>
    )
}