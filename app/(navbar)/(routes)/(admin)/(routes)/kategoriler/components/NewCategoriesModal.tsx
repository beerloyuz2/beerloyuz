"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { SafeCategory } from "@/types"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { NewModal } from "@/components/Modals/NewModal"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Heading from "@/components/Heading"
import { PulseLoader } from "react-spinners"
import { useTheme } from "next-themes"
import { Category, Product } from "@prisma/client"





interface CategoriesModalProps {
    category: Category & {
        products: Product[]
    }
    isOpen: boolean;
    onClose: () => void
    Delete?: boolean;
    Update?: boolean
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Kategori ismi en az 1 karater içermelidir."
    }),
})
type CategoriesModalFormValues = z.infer<typeof formSchema>

const NewCategoriesModal = ({ isOpen, category, onClose, Update, Delete }: CategoriesModalProps) => {


    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();
    const { toast } = useToast()
    const { theme } = useTheme()

    const form = useForm<CategoriesModalFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:  {
            name: category.name
        } 
    })



    const onDelete = () => {
        setIsLoading(true)

        axios.delete(`/api/category/${category?.id}`).then(() => {
            toast({
                variant: "default",
                title: "Kategori başarıyla silindi!"
            })
            router.refresh()
            onClose()
        }).catch(() => {
            toast({
                variant: "destructive",
                title: "Kategoriyi silmeden önce bu kategoriyi kullandığınız ürünleri sildiğinizden emin olun."
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }
    const onUpdate = (data: CategoriesModalFormValues) => {
        setIsLoading(true)


        axios.patch(`/api/category/${category?.id}`, data).then(() => {
            toast({
                variant: "default",
                title: "Kategori başarıyla güncellendi!"
            })
            router.refresh()
            onClose()
            form.clearErrors()
        }).catch(() => {
            toast({
                variant: "destructive",
                title: "Bir şeyler yanlış gitti."
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
            {Delete && (
                <div className="flex flex-col gap-8">
                    <Heading
                        title="Kategoriyi silmek istediğinize emin misiniz?"
                        subtitle="Bu işlemi geri alamazsınız."
                        center
                    />
                    <Button variant="destructive" disabled={isLoading} className=" w-full" onClick={onDelete}>
                        {isLoading ? <PulseLoader color="white" size={5} /> : "Kategoriyi sil"}</Button>
                </div>
            )}

            {Update && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kategori İsmi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="kategori2" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Yeni kategori ismini giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" w-full flex justify-between">
                            <Button disabled={isLoading} variant="destructive" onClick={onClose} className=" w-[40%]">İptal</Button>
                            <Button disabled={isLoading} className=" w-[40%]" type="submit">
                                {isLoading ? <PulseLoader color={theme === "light" ? "white" : "black"} size={5} /> : "Güncelle"}
                            </Button>
                        </div>
                    </form>
                </Form >
            )}
        </NewModal>
    )
}

export default NewCategoriesModal