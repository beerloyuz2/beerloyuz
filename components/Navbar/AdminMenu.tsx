
import * as React from "react"
import Link from "next/link"

import { cn } from "@/libs/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { AiFillShopping } from "react-icons/ai"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

export const AdminMenu = () => {
    return (
        <NavigationMenu className="hidden xl:block">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Hakkımızda</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >

                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            beerloyuz.
                                        </div>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/kisacabiz" title="Kısaca Biz">
                            </ListItem>
                            <ListItem href="/sss" title="Sıkça Sorulan Sorular">
                            </ListItem>
                            <ListItem href="/surdurulebilirlik" title="Sürdürülebilirlik">
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/urunlerimiz" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Ürünlerimiz
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/iletisim" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            İletişim
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Admin Menu</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            <ListItem href="/siparisler" title="Siparişler">
                                Tüm siparişleri gör.
                            </ListItem>
                            <ListItem href="/urunler" title="Ürünler">
                                Ürünleri düzenle.
                            </ListItem>
                            <ListItem href="/kategoriler" title="Kategoriler">
                                Kategorileri düzenle.
                            </ListItem>
                            <ListItem href="/modeller" title="Modeller">
                                Modelleri düzenle.
                            </ListItem>
                            <ListItem href="/renkler" title="Renkler">
                                Renkleri düzenle.
                            </ListItem>
                            <ListItem href="/kullanicilar" title="Kullanıcılar">
                                Tüm Kullanıcıları gör.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <TooltipProvider>
                        <Tooltip delayDuration={50}>
                            <TooltipTrigger>
                                <Link href="/siparislerim" className='cursor-pointer px-2 border' legacyBehavior passHref>
                                    <NavigationMenuLink>
                                        <AiFillShopping size={30} className="text-red-500" />
                                    </NavigationMenuLink>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                Siparişlerim
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
