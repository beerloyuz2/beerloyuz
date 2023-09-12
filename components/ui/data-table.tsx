"use client"

import { Button } from "./button"
import { Input } from "./input"

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
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey: string;
}

export function DataTable<TData, TValue>({
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

    const isConfirmed = (row: any) => {
        if (row.original.confirmed === true) {
            return true
        } else {
            return false
        }

    }
    const getValue = (cell: any) => {
        if (cell.column.id === "createdAt") {
            return dateFormatter.format(cell.getValue())
        }
        if (cell.column.id === "totalPrice") {
            return `${cell.getValue()}TL`
        }
        if (cell.column.id === "price") {
            return `${cell.getValue()}TL`
        }
        if (cell.column.id === "width") {
            return `${cell.getValue()}mm`
        }
        if (cell.column.id === "height") {
            return `${cell.getValue()}mm`
        }
        if (cell.column.id === "other") {
            if(cell.getValue() === "") return "Talep yok"
        }
        if (String(cell.getValue()).length < 30) {
            return (flexRender(cell.column.columnDef.cell, cell.getContext()))
        } else {
            const trimmedValue = String(cell.getValue()).substring(0, 6) + "..."
            return (
                <Button variant="secondary" className="relative z-10">
                    <Popover>
                        <TooltipProvider>
                            <Tooltip delayDuration={50}>
                                <TooltipTrigger>
                                    <PopoverTrigger>
                                        {trimmedValue}
                                    </PopoverTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Tamamını görmek için tıklayınız.
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <PopoverContent>
                            {String(cell.getValue())}
                        </PopoverContent>
                    </Popover>
                </Button>
            )
        }
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
                                    className={cn(" transition-colors relative", isConfirmed(row) === true ? "bg-green-300 hover:bg-green-200 dark:bg-green-500 dark:hover:bg-green-400" : "bg-red-300 hover:bg-red-200 dark:bg-red-500 dark:hover:bg-red-400")}
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
                                    Sipariş bulunmamaktadır.
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
