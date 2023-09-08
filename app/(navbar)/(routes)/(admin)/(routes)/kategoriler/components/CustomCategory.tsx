"use client"

import { SafeCategory } from '@/types'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Pencil } from 'lucide-react'
import NewCategoriesModal from './NewCategoriesModal'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface CustomCategoryProps {
    category: SafeCategory
}


const CustomCategory: React.FC<CustomCategoryProps> = ({ category }) => {

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)

    return (
        <>
            <NewCategoriesModal
                category={category}
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                Delete
            />
            <NewCategoriesModal
                category={category}
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                Update
            />
            <Card className=' relative m-3'>
                <CardHeader className=' p-10'>
                    <p className=' text-center font-bold'>
                        {category.name}
                    </p>
                </CardHeader>
                <AiOutlineClose className=' absolute top-1 right-1 cursor-pointer' size={18} onClick={() => setIsDeleteOpen(true)} />
                <Pencil className=' absolute top-1 right-7 cursor-pointer' size={18} onClick={() => setIsUpdateOpen(true)} />
            </Card>
        </>
    )
}

export default CustomCategory