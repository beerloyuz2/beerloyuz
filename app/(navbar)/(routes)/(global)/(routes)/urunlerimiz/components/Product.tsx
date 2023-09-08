
import { Button } from "@/components/ui/button"
import { Card, CardContent,CardFooter, CardTitle } from "@/components/ui/card"
import { SafeProduct } from "@/types"
import { Category, Color, Model } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { Product, Image as Img } from "@prisma/client"


interface ProductProps {
    product: Product & {
        category: Category
        model: Model
        color: Color
        images: Img[]
    }
}

const Product: React.FC<ProductProps> = ({ product }) => {


    return (
        <>
            <Card className=" group">
                <CardTitle className=" relative h-[280px]  inset-0 cursor-pointer ">
                    <Link href={`/urunlerimiz/${product.id}`}>
                        <Image
                            alt={product.name}
                            src={product.images[0].url}
                            fill
                            style={{ objectFit: "cover", borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}
                        />
                    </Link>
                </CardTitle>
                <CardContent className=" p-2">
                    <div className=" font-bold tracking-wider">
                        {product.name.toUpperCase()}
                    </div>
                    <div className=" text-red-500 font-semibold">
                        {product.category.name.toUpperCase()}
                    </div>
                    <div className=" font-light">
                        Model: {product.model.name}, Kalınlık: 18mm
                    </div>
                </CardContent>
                <CardFooter>
                    <Link href={`/urunlerimiz/${product.id}`} className=" w-full">
                        <Button variant="destructive" className=" cursor-pointer w-full">
                            İncele
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </>
    )
}

export default Product