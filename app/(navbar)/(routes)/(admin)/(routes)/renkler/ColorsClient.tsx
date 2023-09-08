"use client"


import NewColorsForm from "./components/NewColorsForm"
import { AdminTable } from "@/components/ui/admin-data-table"
import { columns } from "./components/columns"

interface ColorsClientProps {
    colors: any;
}


const ColorsClient = ({ colors }: ColorsClientProps) => {

    return (
        <div className="pt-[100px] w-full min-h-screen flex flex-col sm:grid sm:grid-cols-2">
            <div className="w-full sm:min-h-[400px] p-10 pb-6">
                <NewColorsForm />
            </div>
            <div className="w-full min-h-[400px] p-14">
                <AdminTable
                    notFound="Renk"
                    columns={columns}
                    data={colors}
                    searchKey="name"
                />
            </div>
        </div>
    )
}

export default ColorsClient