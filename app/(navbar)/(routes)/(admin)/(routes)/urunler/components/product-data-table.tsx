"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from "react"
import { cn, dateFormatter } from "@/libs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,  DropdownMenuLabel,  DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey: string;
}

export function ProductDataTable<TData, TValue>({
    columns,
    data,
    searchKey
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        }
    })



    const getValue = (cell: any) => {
        if (cell.column.id === "createdAt") {
            return dateFormatter.format(cell.getValue())
        }
        if (cell.column.id === "price") {
            return `${cell.getValue()}TL`
        }
        if (cell.column.id === "colors") {
            const colors = cell.getValue()

            if (colors.length > 1) {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className=" relative z-10" variant="secondary">Renkler</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Renkler</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {colors.map((color: any) => (
                                <DropdownMenuCheckboxItem
                                    checked
                                    disabled
                                    key={color}
                                >
                                    {color}
                                </DropdownMenuCheckboxItem>
                            ))}


                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }

            return colors
        }


        if (cell.column.id === "images") {
            const original = cell.getValue()
            return (
                <div className=" relative w-10 h-10 cursor-pointer">
                    <Image
                        src={original[0].url || ""}
                        fill
                        className="object-cover"
                        alt="sipariş"
                    />
                </div>
            )
        }

        return (flexRender(cell.column.columnDef.cell, cell.getContext()))

    }

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Ara"
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className={cn("relative")}
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {getValue(cell)}
                                        </TableCell>
                                    ))}

                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Ürün bulunmamaktadır.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Geri
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    İleri
                </Button>
            </div>
        </div >
    )
}
