"use client"

import NewCategoriesForm from "./components/NewCategoriesForm"
import { AdminTable } from "@/components/ui/admin-data-table"
import { columns } from "./components/columns"

interface CategoriesClientProps {
    categories: any;
}


const CategoriesClient = ({ categories }: CategoriesClientProps) => {


    return (
        <div className="pt-[100px] w-full min-h-screen flex flex-col sm:grid sm:grid-cols-2">
            <div className="w-full sm:min-h-[400px] p-10 pb-6">
                <NewCategoriesForm />
            </div>
            <div className="w-full min-h-[400px] p-14">
                <AdminTable
                    notFound="Kategori"
                    columns={columns}
                    data={categories}
                    searchKey="name"
                />
            </div>
        </div>
    )
}

export default CategoriesClient