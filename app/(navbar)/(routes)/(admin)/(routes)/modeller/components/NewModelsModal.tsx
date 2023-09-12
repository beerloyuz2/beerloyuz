"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
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
import { Model } from "@prisma/client"





interface ModelsModalProps {
    model: Model
    isOpen: boolean;
    onClose: () => void
    Delete?: boolean;
    Update?: boolean
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Model ismi en az 1 karater içermelidir."
    }),
})
type ModelsModalFormValues = z.infer<typeof formSchema>

const NewModelsModal = ({ isOpen, model, onClose, Update, Delete }: ModelsModalProps) => {


    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();
    const { toast } = useToast()
    const { theme } = useTheme()

    const form = useForm<ModelsModalFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: model.name
        } 
    })


    const onDelete = () => {
        setIsLoading(true)

        axios.delete(`/api/model/${model?.id}`).then(() => {
            toast({
                variant: "default",
                title: "Model başarıyla silindi!"
            })
            router.refresh()
            onClose()
        }).catch(() => {
            toast({
                variant: "destructive",
                title: "Modeli silmeden önce bu modeli kullandığınız ürünleri sildiğinizden emin olun."
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }
    const onUpdate = (data: ModelsModalFormValues) => {
        setIsLoading(true)


        axios.patch(`/api/model/${model?.id}`, data).then(() => {
            toast({
                variant: "default",
                title: "Model başarıyla güncellendi!"
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
                        title="Modeli silmek istediğinize emin misiniz?"
                        subtitle="Bu işlemi geri alamazsınız."
                        center
                    />
                    <Button disabled={isLoading} variant="destructive" className=" w-full" onClick={onDelete}>
                        {isLoading ? <PulseLoader color="white" size={5} /> : "Modeli sil"}</Button>
                </div>
            )}

            {Update &&  (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Model İsmi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="model2" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Yeni model ismini giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" w-full flex justify-between">
                            <Button disabled={isLoading} variant="destructive" onClick={onClose} className=" w-[40%]">İptal</Button>
                            <Button disabled={isLoading} className=" w-[40%]" type="submit">
                                {isLoading ? <PulseLoader color={theme === "light" ? "white" : "black"} size={5} /> : "Güncelle"}</Button>
                        </div>
                    </form>
                </Form >
            )}
        </NewModal>
    )
}

export default NewModelsModal