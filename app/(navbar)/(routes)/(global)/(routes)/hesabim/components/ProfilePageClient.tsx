"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { User } from "@prisma/client"
import axios from "axios"
import * as z from "zod"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PulseLoader } from "react-spinners"
import ImageUpload from "@/components/Input/ImageUpload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProfilePageClientProps {
    currentUser: User | null
}

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Adınız en az 2 karakter içermelidir."
    }),
    lastName: z.string().optional(),
    avatarUrl: z.string().optional(),
    phone: z.string().min(11, {
        message: "Lütfen geçerli telefon numaranızı giriniz."
    }).max(11, {
        message: "Lütfen geçerli telefon numaranızı giriniz."
    }),
})
type ProfilePageClientFormValues = z.infer<typeof formSchema>

const formSchema2 = z.object({
    oldPassword: z.string({
        required_error: "Şifrenizi giriniz."
    }).min(6, {
        message: "Geçerli şifre giriniz."
    }),
    newPassword: z.string({
        required_error: "Yeni şifrenizi giriniz."
    }).min(6, {
        message: "Geçerli şifre giriniz."
    }),
    confirm: z.string({
        required_error: "Yeni şifrenizi onaylayınız."
    }).min(6, {
        message: "Geçerli şifre giriniz."
    }),
}).refine((data) => data.newPassword === data.confirm, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirm"],
});
type ProfilePageClientForm2Values = z.infer<typeof formSchema2>

const ProfilePageClient = ({ currentUser }: ProfilePageClientProps) => {


    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const { toast } = useToast()

    const { theme } = useTheme()

    const form = useForm<ProfilePageClientFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName || "",
            avatarUrl: currentUser?.avatarUrl || "",
            phone: currentUser?.phone
        }
    })

    const form2 = useForm<ProfilePageClientForm2Values>({
        resolver: zodResolver(formSchema2),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirm: ""
        }
    })


    const onSubmit = (data: ProfilePageClientFormValues | ProfilePageClientForm2Values) => {
        setIsLoading(true)


        axios.patch(`/api/user/${currentUser?.id}`, data).then(() => {
            toast({
                variant: "default",
                title: "Profiliniz başarıyla güncellendi!"
            })
            router.refresh()
            form2.reset()
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
        if (!currentUser) return router.push("/girisyap")
    }, [currentUser, router])


    return (
        <div className=" pt-[65px] w-full min-h-screen">
            <Tabs defaultValue="account" className="flex flex-col relative">
                <TabsList className="grid grid-cols-2 w-[300px] self-center absolute top-[250px]">
                    <TabsTrigger value="account">Profil</TabsTrigger>
                    <TabsTrigger value="password">Sifreni değiştir</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full flex flex-col" >
                            <FormField
                                control={form.control}
                                name="avatarUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value}
                                                onChange={(value) => field.onChange(value)}
                                                currentUser={currentUser}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className=" flex flex-col gap-4 px-10 py-24 w-[80%] md:w-[70%] lg:w-[60%] self-center" >
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder={currentUser?.email} disabled />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefon Numarası</FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} placeholder="05433036778" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ad</FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} placeholder="Ad" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Soyad</FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} placeholder="Soyadı (isteğe bağlı)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className=" w-full flex items-center justify-center">
                                    <Button disabled={isLoading} className=" w-[40%] mt-4" type="submit">
                                        {isLoading ? <PulseLoader color={theme === "light" ? "white" : "black"} size={5} /> : "Kaydet"}
                                    </Button>
                                </div>
                            </div>

                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="password">
                    <ImageUpload
                        value={currentUser?.avatarUrl!}
                        onChange={(value) => { }}
                        currentUser={currentUser}
                        fake
                    />
                    <Form {...form2}>
                        <form onSubmit={form2.handleSubmit(onSubmit)} className=" w-full flex flex-col" >
                            <div className=" flex flex-col gap-4 px-10 py-24 w-[80%] md:w-[70%] lg:w-[60%] self-center" >
                                <FormField
                                    control={form2.control}
                                    name="oldPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Eski şifren</FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} type="password" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form2.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Yeni şifren</FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} type="password" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form2.control}
                                    name="confirm"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Şifreni onayla</FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} type="password" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className=" w-full flex items-center justify-center">
                                    <Button disabled={isLoading} className=" w-[40%] mt-4" type="submit">
                                        {isLoading ? <PulseLoader color={theme === "light" ? "white" : "black"} size={5} /> : "Değiştir"}
                                    </Button>
                                </div>
                            </div>

                        </form>
                    </Form>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ProfilePageClient