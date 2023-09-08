"use client"

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { User } from "@prisma/client";




interface OrdersClientProps {
    currentUser: User | null
    allOrders: any;
}


const AdminOrdersClient = ({ allOrders }: OrdersClientProps) => {


    return (
            <div className="pt-[100px] min-h-screen ">
                <div className="px-5">
                    <div className=" h-[50px] font-semibold">
                        Tüm Siparişler
                    </div>
                    <div>
                        <DataTable
                            searchKey="user_firstName"
                            columns={columns}
                            data={allOrders}
                        />
                    </div>
                </div>
            </div>
    )
}

export default AdminOrdersClient