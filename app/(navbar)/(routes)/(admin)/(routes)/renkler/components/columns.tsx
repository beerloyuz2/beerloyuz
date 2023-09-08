"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Color} from "@prisma/client"




export const columns: ColumnDef<Color>[] = [
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
