"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Order, Product, User } from "@prisma/client"




export const columns: ColumnDef<Order & {
    product: Product
    user: User
}>[] = [
        {
            accessorKey: "user.firstName",
            header: "Satın alan kişi",
            cell: ({ row }) => {
                const firstName = row.original.user.firstName
                const lastName = row.original.user.lastName


                return lastName !== null ? firstName + " " + lastName : firstName
            },
        },
        {
            accessorKey: "product.name",
            header: "Ürün",
        },
        {
            accessorKey: "price",
            header: "Adet Fiyatı"
        },
        {
            accessorKey: "totalPrice",
            header: "Toplam Fiyat"
        },
        {
            accessorKey: "height",
            header: "Boy"
        },
        {
            accessorKey: "width",
            header: "En"
        },
        {
            accessorKey: "color",
            header: "Renk"
        },
        {
            accessorKey: "amount",
            header: "Adet",
        },
        {
            accessorKey: "user.phone",
            header: "Telefon",
        },
        {
            accessorKey: "user.email",
            header: "Email",
        },
        {
            accessorKey: "other",
            header: "Talep",
        },
        {
            accessorKey: "createdAt",
            header: "Oluşturulma tarihi",
        },
        {
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} />
        }
    ]
