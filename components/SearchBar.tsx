"use client"

import { Search } from "lucide-react"
import { Input } from "./ui/input"

import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react"
import qs from "query-string"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

const SearchBar = () => {

    const router = useRouter()

    const [value, setValue] = useState("")

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }

    const onSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const query = {
            name: value === "" ? undefined : value
        };

        if(query.name === undefined) return

        const url = qs.stringifyUrl({
            url: "http://localhost:3000/urunlerimiz",
            query
        }, { skipNull: true })
        router.push(url)

    }

    return (
        <div className=" relative">
            <form onSubmit={(e) => onSearch(e)} className="hidden relative xl:block">
                <Button type="submit" className="absolute top-0 right-0 text-muted-foreground cursor-pointer hover:bg-[#d7d7d7] rounded-lg flex items-center justify-center">
                    <Search className="h-3 w-3" />
                </Button>
                <Input onChange={onChange} value={value} placeholder="Ara..." className=" pl-4 bg-primary/10" />
            </form>
            <Popover>
                <PopoverTrigger className=" xl:hidden">
                    <Button className="absolute -top-2 right-0 text-muted-foreground cursor-pointer rounded-lg flex items-center justify-center">
                        <Search className="h-3 w-3" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=" xl:hidden">
                    <form onSubmit={(e) => onSearch(e)}>
                        <Input onChange={onChange} value={value} placeholder="Ara..." className=" pl-4 bg-primary/10" />
                        <Button variant="secondary" type="submit" className="absolute top-4 right-4 text-muted-foreground cursor-pointer rounded-lg flex items-center justify-center">
                            <Search className="h-3 w-3" />
                        </Button>
                    </form>
                </PopoverContent>
            </Popover>
        </div>


    )
}

export default SearchBar