"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/libs/utils";
import { Category, Product, Model } from '@prisma/client'

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"

interface FilterProps {
    data: (Category & {
        products: Product[]
    } | Model & {
        products: Product[]
    })[] | null;
    name: string;
    valueKey: string;
}

const Filter = ({ data, name, valueKey }: FilterProps) => {

    const searchParams = useSearchParams();
    const router = useRouter()

    const selectedValue = searchParams.get(valueKey)

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id
        };

        if (current[valueKey] === id) {
            query[valueKey] = null;

        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true })

        router.push(url)
    }

    return (
        <>
            <div className=" mb-8 p-4 bg-secondary/50 rounded-lg flex flex-col gap-y-4">
                <h3 className=" text-lg font-light">
                    {name}
                </h3>

                <ScrollArea className=" text-primary">
                    <div className=" flex flex-col gap-2 max-h-[230px]">
                        {data?.map((filter) => (
                            <div key={filter.id} className="flex items-center justify-center">
                                <Button onClick={() => onClick(filter.id)} className={cn(" rounded-md text-sm w-[80%] p-1", selectedValue === filter.id && " bg-red-600 text-white")}>
                                    {filter.name}
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea >
            </div>
        </>
    )
}

export default Filter