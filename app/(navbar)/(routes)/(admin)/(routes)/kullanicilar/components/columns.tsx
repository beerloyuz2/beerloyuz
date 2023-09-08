"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Order, User } from "@prisma/client"




export const columns: ColumnDef<User & {
    orders: Order[]
}>[] = [
    {
        accessorKey: "firstName",
        header: "Kullanıcı adı",
        cell: ({ row }) => {
            const firstName = row.original.firstName
            const lastName = row.original.lastName


            return lastName !== null ? firstName + " " + lastName : firstName
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "admin",
        header: "Kullanıcı türü",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
