"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Category, Product } from "@prisma/client"




export const columns: ColumnDef<Category & {
    products: Product[]
}>[] = [
    {
        accessorKey: "name",
        header: "İsim",
    },
    {
        id: "actions",
        header: "Kullanılan Ürün sayısı",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
