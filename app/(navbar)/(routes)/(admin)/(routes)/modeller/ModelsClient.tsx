"use client"

import NewModelsForm from "./components/NewModelsForm"
import { AdminTable } from "@/components/ui/admin-data-table"
import { columns } from "./components/columns"

interface ModelsClientProps {
    models?: any
}


const ModelsClient = ({ models }: ModelsClientProps) => {



    return (
        <div className="pt-[100px] w-full min-h-screen flex flex-col sm:grid sm:grid-cols-2">
            <div className="w-full sm:min-h-[400px] p-10 pb-6">
                <NewModelsForm />
            </div>
            <div className="w-full min-h-[400px] p-14">
                <AdminTable
                    notFound="Model"
                    columns={columns}
                    data={models}
                    searchKey="name"
                />
            </div>
        </div>
    )
}

export default ModelsClient