"use client"


import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import NewImageUpload from "@/components/Input/NewImageUpload"
import { PulseLoader } from "react-spinners"
import { useTheme } from "next-themes"
import { Model, Category, Color, Product, Image } from "@prisma/client"
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select"
import NewProductsModal from "./NewProductsModal"


interface ProductFormProps {
    product?: Product & {
        category: Category
        model: Model
        images: Image[]
    } | null
    categories: Category[] | null
    models: Model[] | null
    colors: Color[] | null
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Ürün ismi en az 1 karakter içermelidir."
    }),
    images: z.object({ url: z.string() }).array().min(1, {
        message: "Ürün en az 1 resim içermelidir."
    }),
    price: z.coerce.number().min(1, {
        message: "Ürün m² fiyatı en az 1 sayı içermelidir."
    }),
    colors: z.array(z.string()).min(1, {
        message: "Ürün en az 1 renk içermelidir."
    }),
    modelId: z.string().min(1, {
        message: "Ürün modeli seçmeden ürün ekleyemezsiniz."
    }),
    categoryId: z.string().min(1, {
        message: "Ürün rengi seçmeden ürün ekleyemezsiniz."
    }),


})
type ShopModalFormValues = z.infer<typeof formSchema>

const ProductForm = ({ categories, models, colors, product }: ProductFormProps) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const router = useRouter()

    const { toast } = useToast()

    const { theme } = useTheme()

    const form = useForm<ShopModalFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: product ? {
            name: product?.name || "",
            colors: product?.colors || "",
            modelId: product?.modelId || "",
            categoryId: product?.categoryId || "",
            images: product?.images || "",
            price: product?.price || 1

        } : {
            name: "",
            colors: [],
            modelId: "",
            categoryId: "",
            images: [],
            price: 1
        }
    }
    )

    const onSubmit = (data: ShopModalFormValues) => {
        setIsLoading(true);
        if (product) {
            axios.patch(`/api/product/${product.id}`, data).then(() => {
                toast({
                    variant: "default",
                    title: "Ürün başarıyla güncellendi."
                })
                form.reset()
                form.clearErrors()
                router.push("/urunler")
                router.refresh()
            }).catch(() => {
                toast({
                    variant: "destructive",
                    title: "Bir şeyler yanlış gitti."
                })
            }).finally(() => {
                setIsLoading(false)
            })
        } else {
            axios.post("/api/product", data).then(() => {
                toast({
                    variant: "default",
                    title: "Ürün başarıyla eklendi."
                })
                form.reset()
                form.clearErrors()
                router.push("/urunler")
            }).catch(() => {
                toast({
                    variant: "destructive",
                    title: "Bir şeyler yanlış gitti."
                })
            }).finally(() => {
                setIsLoading(false)

            })
        }

    }


    return (
        <>
            <NewProductsModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                product={product}
            />

            <div className=" pt-[100px] px-[10px] sm:px-[50px] flex flex-col w-full min-h-screen ">
                <div className=" flex justify-between items-center">
                    <p className=" py-5 font-bold text-2xl">Ürün ekle</p>
                    <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
                        Ürünü kaldır
                    </Button>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full flex flex-col  md:grid md:grid-cols-2 lg:grid lg:grid-cols-3  gap-10">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ürün İsmi</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="ürün1" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Ürün İsmini giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>m² Fiyatı(TL)</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} type="number" placeholder="123" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Ürünün m² fiyatını giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Kategoriler</FormLabel>
                                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value} placeholder="Kategori seç"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories?.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Ürünün kategorisini seçiniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="modelId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Modeller</FormLabel>
                                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value} placeholder="Model seç"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {models?.map((model) => (
                                                <SelectItem key={model.id} value={model.id}>
                                                    {model.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Ürünün modelini seçiniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colors"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Renkler</FormLabel>
                                    <FancyMultiSelect
                                        isLoading={isLoading}
                                        colors={colors}
                                        value={field.value}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        onRemove={(newValue) => field.onChange(newValue)}
                                    />
                                    <FormDescription>
                                        Ürünün rengini seçiniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <NewImageUpload
                                            disabled={isLoading}
                                            value={field.value ? field.value.map((image) => image.url) : []}
                                            onChange={(url) => field.onChange([...field.value, { url }])}
                                            onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button className=" w-full" type="submit">
                                {!isLoading ? product ? "Ürünü güncelle" : "Ürün oluştur" : <PulseLoader color={theme === "light" ? "white" : "black"} size={5} />}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default ProductForm