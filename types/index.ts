import { Category, Color, Model, Order, User as PrismaUser, Product } from "@prisma/client";
import { User } from "next-auth"

export type SafeUser = Omit<PrismaUser,
    "emailVerified"> & {
        emailVerified: string | null;
    }

export type SafeCategory = Omit<Category,
    "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    }

export type SafeModel = Omit<Model,
    "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    }

export type SafeColor = Omit<Color,
    "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    }
export type SafeProduct = Omit<Product,
    "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    }


export type SafeOrder = Omit<Order,
    "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    }

export type fullProduct = Product & { category: Category, color: Color, model: Model }
export type fullOrder = Order & { product: fullProduct, user: SafeUser }
