"use client"

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
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Order, Product, User } from "@prisma/client"

interface NewMenuProps {
    orders: (Order & {
        product: Product
        user: User
    })[] | null
}

export const NewMenu = ({ orders }: NewMenuProps) => {
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
                                        <p className="text-sm leading-tight text-muted-foreground">
                                        </p>
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
                    <Link href="/siparislerim" className='cursor-pointer w-[50px] relative' legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <TooltipProvider>
                                <Tooltip delayDuration={50}>
                                    <TooltipTrigger>
                                        <AiOutlineShoppingCart size={30} />
                                        {orders?.length! > 0 && (
                                            <div className=" absolute -right-3 top-[12px] font-bold text-red-500">
                                                {orders?.length}
                                            </div>
                                        )}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Siparişlerim
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </NavigationMenuLink>
                    </Link>
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
