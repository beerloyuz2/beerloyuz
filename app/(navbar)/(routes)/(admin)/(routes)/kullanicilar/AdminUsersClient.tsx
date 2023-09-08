"use client"

import { columns } from "./components/columns";
import { UserDataTable } from "./components/user-data-table";
import { Order, User } from "@prisma/client";




interface UsersClientProps {
    currentUser: User | null
    allUsers: (User & {
        orders: Order[]
    })[] | null;
}


const AdminUsersClient = ({ allUsers }: UsersClientProps) => {


    return (
        <div className="pt-[100px] min-h-screen ">
            <div>
                <div className="m-2 h-[50px] font-semibold">
                    Tüm Kullanıcılar ({allUsers?.length})
                </div>
                <div className="px-5">
                    <UserDataTable
                        searchKey="name"
                        columns={columns}
                        data={allUsers!}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminUsersClient