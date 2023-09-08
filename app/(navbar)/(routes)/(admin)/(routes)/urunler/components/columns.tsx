"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Category, Color, Image, Model, Product, User } from "@prisma/client"





export const columns: ColumnDef<Product & {
    category: Category
    model: Model
    images: Image[]
}>[] = [
        {
            accessorKey: "images",
            header: "",
        },
        {
            accessorKey: "name",
            header: "Ürün ismi",
        },
        {
            accessorKey: "category.name",
            header: "Kategori",
        },
        {
            accessorKey: "model.name",
            header: "Model",
        },
        {
            accessorKey: "colors",
            header: "Renkler",
        },
        {
            accessorKey: "price",
            header: "m² fiyatı",
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
