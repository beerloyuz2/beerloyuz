"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Heading from "../Heading"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewModal } from "./NewModal"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { Category, Image, Model } from "@prisma/client"
import { useTheme } from "next-themes"
import { Order, Product, User } from "@prisma/client"
import { PulseLoader } from "react-spinners"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ToastAction } from "../ui/toast"



enum STEPS {
    OLCUMLER = 0,
    AYRINTILAR = 1
}

interface ShopModalProps {
    isOpen: boolean;
    onClose: () => void
    product?: Product & {
        category: Category
        model: Model
        images: Image[]
    }
    color?: string
    Update?: boolean;
    Add?: boolean;
    Delete?: boolean;
    Confirm?: boolean;
    order?: Order & {
        product: Product
        user: User
    }
}
const formSchema = z.object({
    height: z.coerce.number().min(100, {
        message: "Boy 100mm veya daha fazla olmalıdır."
    }),
    width: z.coerce.number().min(100, {
        message: "En 100mm veya daha fazla olmalıdır."
    }),
    amount: z.coerce.number().min(1, {
        message: "Lütfen istediğiniz adeti giriniz."
    }),
    price: z.coerce.number().min(1),
    other: z.string().optional(),
    productId: z.string().min(1),
    color: z.string({
        required_error: "Lütfen istediğiniz rengi seçiniz."
    }),
})
type ShopModalFormValues = z.infer<typeof formSchema>

const NewShopModal = ({ product, isOpen, onClose, Add, Update, Delete, order, Confirm, color}: ShopModalProps) => {

    const [steps, setSteps] = useState(STEPS.OLCUMLER)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();
    const { toast } = useToast()
    const { theme } = useTheme()

    const form = useForm<ShopModalFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: order ? {
            height: order.height,
            width: order.width,
            other: order.other || "",
            amount: order.amount,
            color: order.color,
            price: 1,
            productId: order.product.id
        } : {
            height: 100,
            width: 100,
            other: "",
            color: color,
            amount: 1,
            price: 1,
            productId: product?.id
        }
    })



    const onBack = () => {
        setSteps((value) => value - 1)
    }

    const onNext = () => {

        setSteps((value) => value + 1)
    }

    const onSubmit = (data: ShopModalFormValues) => {
        setIsLoading(true);

        const newData = {
            ...data,
            price: parseFloat(((((data.height) * (data.width)) / 10000) * product?.price!).toFixed(2))
        }
        axios.post("/api/order", newData).then(() => {
            toast({
                variant: "default",
                title: "Sipariş başarıyla verildi!",
                action: <ToastAction altText="Siparişlerim" onClick={()=> router.push("/siparislerim")}>Siparişlerime git</ToastAction>
            })
            router.refresh()
            setSteps(STEPS.OLCUMLER)
            form.reset()
            onClose()
        }).catch(() => {
            toast({
                variant: "destructive",
                title: "Bir şeyler yanlış gitti."
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }
    const onDelete = () => {
        setIsLoading(true)

        axios.delete(`/api/order/${order?.id}`).then(() => {
            toast({
                variant: "default",
                title: "Siparişiniz başarıyla iptal edildi!"
            })
            onClose()
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
    const onConfirm = () => {
        setIsLoading(true)

        axios.patch(`/api/confirm/${order?.id}`).then(() => {
            toast({
                variant: "default",
                title: "Sipariş başarıyla onaylandı!"
            })
            onClose()
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
    const onUpdate = (data: ShopModalFormValues) => {
        setIsLoading(true)

        const newData = {
            ...data,
            price: parseFloat((((data.height * data.width) / 10000) * order?.product.price!).toFixed(2))
        }

        axios.patch(`/api/order/${order?.id}`, newData).then(() => {
            toast({
                variant: "default",
                title: "Siparişiniz başarıyla güncellendi!"
            })
            onClose()
            setSteps(STEPS.OLCUMLER)
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

    useEffect(() => {
        if (form.formState.errors.height || form.formState.errors.width || form.formState.errors.amount) {
            setSteps(STEPS.OLCUMLER)
        }
    }, [form.formState.errors])

    return (
        <NewModal
            title={product?.name.toUpperCase() || order?.product.name.toUpperCase()}
            isOpen={isOpen}
            onClose={onClose}
        >
            {Add && steps === STEPS.OLCUMLER && (
                <Form {...form}>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        onNext()
                    }} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Boy(mm)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="234" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Ürün boyunu giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="width"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>En</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="123" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Ürün enini giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adet</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="333" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Ürün adetini giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" w-full flex justify-between">
                            <Button className=" w-full" type="submit">İleri</Button>
                        </div>
                    </form>
                </Form>
            )}
            {Add && steps === STEPS.AYRINTILAR && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Renkler</FormLabel>
                                    <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder="Renk seç"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {product?.colors.map((color) => (
                                                <SelectItem key={color} value={color}>
                                                    {color}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Ürünün rengini seçiniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="other"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Talep</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="... istiyorum." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Talebinizi giriniz(var ise).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" w-full flex justify-between">
                            <Button disabled={isLoading} variant="destructive" onClick={onBack} className=" w-[40%]">Geri</Button>
                            <Button disabled={isLoading} className=" w-[40%]" type="submit">
                                {isLoading ? <PulseLoader color={theme === "light" ? "white" : "black"} size={5} /> : "Sipariş ver"}</Button>
                        </div>
                    </form>
                </Form >
            )}
            {Update && order && steps === STEPS.OLCUMLER && (
                <Form {...form}>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        onNext()
                    }} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Boy(mm)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="234" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Yeni Boyu giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="width"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>En</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="123" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Yeni eni giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adet</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="333" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Yeni adeti giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" w-full flex justify-between">
                            <Button className="w-full" type="submit">İleri</Button>
                        </div>
                    </form>
                </Form>
            )}
            {Update && order && steps === STEPS.AYRINTILAR && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Renkler</FormLabel>
                                    <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder="Renk seç"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {order.product.colors.map((c) => (
                                                <SelectItem key={c} value={c}>
                                                    {c}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Ürünün rengini seçiniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="other"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Talep</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="... istiyorum." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Yeni talebinizi giriniz.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" w-full flex justify-between">
                            <Button disabled={isLoading} variant="destructive" onClick={onBack} className=" w-[40%]">Geri</Button>
                            <Button disabled={isLoading} className=" w-[40%]" type="submit">
                                {isLoading ? <PulseLoader color={theme === "light" ? "white" : "black"} size={5} /> : "Güncelle"}
                            </Button>
                        </div>
                    </form>
                </Form >
            )}
            {Delete && order && (
                <div className="flex flex-col gap-8">
                    <Heading
                        title="Siparişi iptal etmek istediğinize emin misiniz?"
                        subtitle="Bu işlemi geri alamazssınız."
                        center
                    />
                    <Button disabled={isLoading} variant="destructive" className=" w-full" onClick={onDelete}>
                        {isLoading ? <PulseLoader color="white" size={5} /> : "Siparişi iptal et"}</Button>
                </div>
            )}
            {Confirm && order && (
                <div className="flex flex-col gap-8">
                    <Heading
                        title="Siparişi onaylamak istediğinize emin misiniz?"
                        subtitle="Bu işlemi geri alamazssınız."
                        center
                    />
                    <Button disabled={isLoading} className=" w-full" onClick={onConfirm}>
                        {isLoading ? <PulseLoader color={theme === "light" ? "white" : "black"} size={5} /> : "Siparişi Onayla"}</Button>
                </div>
            )}
        </NewModal>
    )
}

export default NewShopModal