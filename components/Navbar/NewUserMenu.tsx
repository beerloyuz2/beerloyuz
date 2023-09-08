"use client"

import {
    BadgeHelp,
    Contact,
    DoorClosed,
    LogIn,
    LogOut,
    Mail,
    MessageSquare,
    PlusCircle,
    User,
    User2,
    UserCircle,
    UserCircle2,
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
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import SearchBar from "../SearchBar"
import { ModeToggle } from "../ui/mode-toggle"
import { Order, Product, User as Usertype } from "@prisma/client"
import { useState } from "react"
import LogoutModal from "../Modals/LogoutModal"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface UserMenuProps {
    currentUser: Usertype | null
    orders: (Order & {
        product: Product
        user: Usertype
    })[] | null
}


export const NewUserMenu: React.FC<UserMenuProps> = ({ currentUser, orders }) => {

    const router = useRouter()
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
                <div className="xl:hidden">
                    <Link href="/siparislerim" className=" cursor-pointer relative flex items-center justify-center ">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <AiOutlineShoppingCart className=" w-[23px] h-[23px] sm:w-[30px] sm:h-[30px]" />
                                    {orders?.length! > 0 && (
                                        <div className=" absolute sm:-right-4 sm:top-[6px] -right-3 top-[4px] text-xs sm:text-sm font-bold text-red-500">
                                            {orders?.length}
                                        </div>
                                    )}
                                </TooltipTrigger>
                                <TooltipContent>
                                    Siparişlerim
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className=" bg-secondary">
                        <Button variant="ghost" className="py-5 px-0 border-[1px] flex flex-row items-center rounded-full cursor-pointer hover:shadow-md transition">
                            {currentUser ? (
                                <Avatar className=" w-10 h-10">
                                    <AvatarImage style={{objectFit: "cover"}} src={currentUser.avatarUrl!} alt={currentUser.firstName} />
                                    <AvatarFallback>{currentUser?.firstName[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                            ): (
                                <AiOutlineMenu className="m-5" />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Menu</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {currentUser && (
                                <DropdownMenuItem>
                                    <Link href="/hesabim" className="flex items-center">
                                        <UserCircle className="mr-2 h-4 w-4" />
                                        <span>Hesabım</span>
                                    </Link>
                                </DropdownMenuItem>
                            )}

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
                        {currentUser ? (
                            <DropdownMenuItem onClick={() => setIsLogoutOpen(true)}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Çıkış yap</span>
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem onClick={() => router.push("/girisyap")}>
                                <LogIn className="mr-2 h-4 w-4" />
                                <span>Giriş yap</span>
                            </DropdownMenuItem>
                        )}

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}
