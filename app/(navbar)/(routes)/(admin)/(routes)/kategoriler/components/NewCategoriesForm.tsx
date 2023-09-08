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





const formSchema = z.object({
    name: z.string().min(1, {
        message: "Kategori ismi en az 1 karater içermelidir."
    }),
})
type NewCategoriesFormValues = z.infer<typeof formSchema>

const NewCategoriesForm = () => {


    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();
    const { toast } = useToast()
    const { theme } = useTheme()

    const form = useForm<NewCategoriesFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })




    const onSubmit = (data: NewCategoriesFormValues) => {
        setIsLoading(true);

        axios.post("/api/category", data).then(() => {
            toast({
                variant: "default",
                title: "Kategori başarıyla eklendi."
            })
            router.refresh()
            form.reset()
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
        <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kategori İsmi</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="Kapak" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Kategori ismini giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" w-full flex items-center justify-center sm:justify-start">
                            <Button disabled={isLoading} className=" w-[40%]" type="submit">
                                {isLoading ? <PulseLoader color={theme === "light" ? "white" : "black"} size={5} /> : "Kategori ekle"}</Button>
                        </div>
                    </form>
                </Form >
        </div>

    )
}

export default NewCategoriesForm