"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { PulseLoader } from "react-spinners"
import { useTheme } from "next-themes"
import { User } from "@prisma/client"
import { cn } from "@/libs"





const formSchema = z.object({
    email: z.string().email({
        message: "Geçerli Eposta giriniz."
    }).min(1, {
        message: "Geçerli Eposta giriniz."
    }),
    password: z.string().min(6, {
        message: "Geçerli şifre giriniz."
    }),
    confirm: z.string({
        required_error: "Yeni şifrenizi onaylayınız."
    }).min(6, {
        message: "Geçerli şifre giriniz."
    }),
    firstName: z.string().min(2, {
        message: "Adınız en az 2 karakter içermelidir."
    }),
    phone: z.string().min(11, {
        message: "Lütfen geçerli telefon numaranızı giriniz."
    }).max(11, {
        message: "Lütfen geçerli telefon numaranızı giriniz."
    }),
    lastName: z.string().optional()
}).refine((data) => data.password === data.confirm, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirm"],
});
type SignUpPageClientValues = z.infer<typeof formSchema>

interface SignUpPageClientProps {
    currentUser: User | null
}

const SignUpPageClient = ({ currentUser }: SignUpPageClientProps) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const { theme } = useTheme()


    const form = useForm<SignUpPageClientValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            phone: "",
        }
    }
    )

    const onSubmit = (data: SignUpPageClientValues) => {
        setIsLoading(true);


        axios.post("/api/register", data).then(() => {
            toast({
                variant: "default",
                title: "Kayıt oldunuz!"
            })
            router.push("/girisyap")
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
        if (currentUser) return router.back()
    }, [currentUser, router])

    const inputClassname = "text-xs lg:text-sm py-1 px-1 lg:px-3 lg:py-2"
    const labelClassname = "text-xs lg:text-sm"

    return (
        <Card className="w-[450px] text-xs lg:text-sm ">
            <CardHeader>
                <CardTitle className={cn(isLoading && "text-muted-foreground")}>Hoşgeldiniz!</CardTitle>
                <CardDescription className={cn(isLoading && "text-muted-foreground")}>Hesap oluşturunuz.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-y-1 md:gap-y-2 lg:gap-y-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClassname}>Email</FormLabel>
                                    <FormControl>
                                        <Input className={inputClassname} disabled={isLoading} placeholder="örnek@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClassname}>Telefon Numarası</FormLabel>
                                    <FormControl>
                                        <Input className={inputClassname} disabled={isLoading} placeholder="05433036778" {...field} />
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
                                    <FormLabel className={labelClassname}>Ad</FormLabel>
                                    <FormControl>
                                        <Input className={inputClassname} disabled={isLoading} placeholder="Ad" {...field} />
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
                                    <FormLabel className={labelClassname}>Soyadınız</FormLabel>
                                    <FormControl>
                                        <Input className={inputClassname} disabled={isLoading} placeholder="Soyadı (isteğe bağlı)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClassname}>Şifre</FormLabel>
                                    <FormControl>
                                        <Input className={inputClassname} disabled={isLoading} type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClassname}>Şifreni onayla</FormLabel>
                                    <FormControl>
                                        <Input className={inputClassname} disabled={isLoading} type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button disabled={isLoading} className=" w-full mt-4 text-xs lg:text-sm" type="submit">
                                {isLoading ? <PulseLoader color={theme === "light" ? "white" : "black"} size={5} /> : "Kayıt ol"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <div className=" flex items-center justify-center w-full">
                    <div className={cn(isLoading && "text-muted-foreground")}>
                        Zaten hesabın var mı?
                        <Link className="pl-2 hover:underline font-semibold" href="/girisyap">Giriş yap</Link>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default SignUpPageClient