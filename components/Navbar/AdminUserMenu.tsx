"use client"

import {
    BadgeHelp,
    Boxes,
    Brush,
    Contact,
    DoorClosed,
    Layers,
    LogIn,
    LogOut,
    Mail,
    MessageSquare,
    PlusCircle,
    ShoppingBag,
    User,
    User2,
    UserCircle,
} from "lucide-react"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AiFillShopping } from "react-icons/ai"
import Link from "next/link"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import SearchBar from "../SearchBar"
import { ModeToggle } from "../ui/mode-toggle"
import { useState } from "react"
import LogoutModal from "../Modals/LogoutModal"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { User as UserType } from "@prisma/client"

interface AdminUserMenuProps {
    currentUser: UserType
}

export const AdminUserMenu = ({ currentUser }: AdminUserMenuProps) => {

    const [isLogoutOpen, setIsLogoutOpen] = useState(false)

    return (
        <>
            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
            />
            <div className="flex gap-3 sm:gap-4 md:gap-5 items-center justify-center mr-3">
                <SearchBar />
                <ModeToggle />
                <div className="flex items-center  xl:hidden">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href="/siparislerim">
                                    <AiFillShopping className=" cursor-pointer text-red-500" size={30} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                Tüm siparişler
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className=" py-5 px-0 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                            <Avatar className=" w-10 h-10 border-[2px] border-red-500">
                                <AvatarImage style={{objectFit: "cover"}} src={currentUser.avatarUrl!} alt={currentUser.firstName} />
                                <AvatarFallback>{currentUser.firstName[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>ADMİN</DropdownMenuLabel>
                        <DropdownMenuSeparator className="xl:hidden" />
                        <DropdownMenuGroup className="xl:hidden">
                            <DropdownMenuItem>
                                <Link href="/kullanicilar" className="flex items-center">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Kullanıcılar</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/siparisler" className="flex items-center">
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    <span>Siparişler</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/urunler" className="flex items-center">
                                    <DoorClosed className="mr-2 h-4 w-4" />
                                    <span>Ürünler</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/kategoriler" className="flex items-center">
                                    <Boxes className="mr-2 h-4 w-4" />
                                    <span>Kategoriler</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/modeller" className="flex items-center">
                                    <Layers className="mr-2 h-4 w-4" />
                                    <span>Modeller</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/renkler" className="flex items-center">
                                    <Brush className="mr-2 h-4 w-4" />
                                    <span>Renkler</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href="/hesabim" className="flex items-center">
                                    <UserCircle className="mr-2 h-4 w-4" />
                                    <span>Hesabım</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/urunlerimiz" className="flex items-center">
                                    <DoorClosed className="mr-2 h-4 w-4" />
                                    <span>Ürünlerimiz</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href="/iletisim" className="flex items-center">
                                    <Contact className="mr-2 h-4 w-4" />
                                    <span>İletişim</span>
                                </Link>

                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <BadgeHelp className="mr-2 h-4 w-4" />
                                    <span>Hakkımızda</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Link href="/kisacabiz" className="flex items-center">
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                <span>Kısaca Biz</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/sss" className="flex items-center">
                                                <Mail className="mr-2 h-4 w-4" />
                                                <span>S.S.S</span>
                                            </Link>

                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/surdurulebilirlik" className="flex items-center">
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                <span>Sürdürülebilirlik</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setIsLogoutOpen(true)}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Çıkış yap</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}
