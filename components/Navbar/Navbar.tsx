"use client"


import Logo from './Logo'
import { Order, Product, User } from '@prisma/client'
import { NewMenu } from './NewMenu'
import { NewUserMenu } from './NewUserMenu'
import { AdminMenu } from './AdminMenu'
import { AdminUserMenu } from './AdminUserMenu'

interface NavbarProps {
    currentUser: User | null
    orders: (Order & {
        product: Product
        user: User
    })[] | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, orders }) => {
    return (
        <div className='fixed w-full z-20 shadow-sm bg-inherit'>
            <div className='items-center gap-3 md:gap-0 py-4 flex flex-row justify-between '>
                <Logo />
                {currentUser?.admin === true ? (
                    <>
                        <AdminMenu/>
                        <AdminUserMenu currentUser={currentUser}/>
                    </>
                ) : (
                    <>
                        <NewMenu orders={orders} />
                        <NewUserMenu orders={orders} currentUser={currentUser} />
                    </>
                )}

            </div>
        </div>
    )
}

export default Navbar