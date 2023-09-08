"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Category, Color, Image, Model } from "@prisma/client"
import { Product } from "@prisma/client"
import { ProductDataTable } from "./components/product-data-table"
import { columns } from "./components/columns"

interface ProductsClientProps {
    products: (Product & {
        category: Category
        model: Model
        images: Image[]
    })[] | null;
}


const ProductsClient = ({ products }: ProductsClientProps) => {

    const router = useRouter()

    return (
        <>
            <div className="pt-[100px] min-h-screen ">
                <div>
                    <div className="px-5 h-[50px] font-semibold w-full flex justify-between items-center">
                        <p>
                            Ürünler
                        </p>
                        <Button variant="default" onClick={() => router.push("/urunler/yeni")}>
                            Ürün ekle
                        </Button>
                    </div>
                    <div className="px-5">
                            <ProductDataTable
                                searchKey="name"
                                columns={columns}
                                data={products!}
                            />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsClient