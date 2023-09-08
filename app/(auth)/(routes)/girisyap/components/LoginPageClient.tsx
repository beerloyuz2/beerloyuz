"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/libs"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { signIn } from "next-auth/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { PulseLoader } from "react-spinners"

import * as z from "zod"


interface LoginPageClientProps {
    currentUser: User | null
}

const formSchema = z.object({
    email: z.string().email({
        message: "Geçerli Eposta giriniz."
    }).min(1, {
        message: "Geçerli Eposta giriniz."
    }),
    password: z.string().min(6, {
        message: "Geçerli şifre giriniz."
    })
})
type LoginPageClientValues = z.infer<typeof formSchema>

const LoginPageClient = ({ currentUser }: LoginPageClientProps) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const { theme } = useTheme()



    const form = useForm<LoginPageClientValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    }
    )

    const onSubmit = (data: LoginPageClientValues) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false
        }).then((callback) => {
            if (callback?.error) {
                toast({
                    variant: "destructive",
                    title: "Geçersiz kimlik bilgileri."
                })
            }

            if (callback?.ok && !callback?.error) {
                toast({
                    variant: "default",
                    title: "Giriş yapıldı!"
                })
                router.back()
                router.refresh()
            }
        }).finally(() => setIsLoading(false))
    }

    useEffect(()=> {
        if(currentUser) return router.back()
    }, [currentUser, router])

    const inputClassname = "text-xs lg:text-sm py-1 px-1 lg:px-3 lg:py-2"
    const labelClassname = "text-xs lg:text-sm"

    return (
        <Card className="w-[450px] text-xs lg:text-sm">
            <CardHeader>
                <CardTitle className={cn(isLoading && "text-muted-foreground")}>Tekrardan Hoşgeldiniz.</CardTitle>
                <CardDescription className={cn(isLoading && "text-muted-foreground")}>Giriş yapınız.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-y-6">
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
                        <div>
                            <Button disabled={isLoading} className=" flex items-center justify-center w-full text-xs lg:text-sm" type="submit">
                                {isLoading ? <PulseLoader color={theme === "light" ? "white": "black"} size={5} /> : "Giriş yap"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <div className=" flex items-center justify-center w-full">
                    <div className={cn(isLoading && "text-muted-foreground")}>
                        Hesabınız yok mu?
                        <Link className="pl-2 hover:underline font-semibold" href="/kayitol">Kayıt ol.</Link>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default LoginPageClient