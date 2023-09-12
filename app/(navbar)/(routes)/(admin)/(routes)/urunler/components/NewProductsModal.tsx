"use client"

import { useState } from "react"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { NewModal } from "@/components/Modals/NewModal"
import { Button } from "@/components/ui/button"
import Heading from "@/components/Heading"
import { Category, Color, Image, Model, Product } from "@prisma/client"
import { PulseLoader } from "react-spinners"







interface ProductsModalProps {
    product?: Product & {
        category: Category
        model: Model
        images: Image[]
    } | null
    isOpen: boolean;
    onClose: () => void
}



const NewProductsModal = ({ isOpen, onClose, product }: ProductsModalProps) => {


    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();
    const { toast } = useToast()


    const onDelete = () => {
        setIsLoading(true)
        axios.delete(`/api/product/${product?.id}`).then(() => {
            toast({
                variant: "default",
                title: "Ürün başarıyla silindi!"
            })
            router.push("/urunler")
            router.refresh()
            onClose()
        }).catch(() => {
            toast({
                variant: "destructive",
                title: "Ürünü silmeden önce bu ürünü için aktif talep olmadığından emin olunuz."
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }





    return (
        <NewModal
            title=""
            isOpen={isOpen}
            onClose={onClose}
        >

            <div className="flex flex-col gap-8">
                <Heading
                    title="Ürünü silmek istediğinize emin misiniz?"
                    subtitle="Bu işlemi geri alamazsınız."
                    center
                />
                <Button variant="destructive" disabled={isLoading} className=" w-full" onClick={onDelete}>
                    {isLoading ? <PulseLoader color="white" size={5} /> : "Ürünü sil"}
                </Button>
            </div>


        </NewModal>
    )
}

export default NewProductsModal